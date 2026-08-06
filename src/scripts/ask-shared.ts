// ─────────────────────────────────────────────────────────────────────────────
//  Shared Ask Assistant client logic — used by the search modal's Ask Assistant
//  view (Search.astro).
//
//  Markdown rendering is XSS-safe: all text is HTML-escaped before any tags are
//  added, and link hrefs are scheme-validated.
// ─────────────────────────────────────────────────────────────────────────────

import { stripBase, withBase } from '../lib/base';

// The API routes are serverless functions at the DOMAIN root, not inside the
// docs base path (vercel.json maps api/ask.ts to /api/ask), so these two are
// deliberately NOT run through withBase().
export const ASK_API_URL = '/api/ask';

export const IC_COPY =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
export const IC_CHECK =
  '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>';

// stripBase matters here: under /docs-new every pathname starts with the base,
// so a bare startsWith('/arcus/') would report EVERY page as Suite and quietly
// filter Ask AI retrieval to the wrong product on all of Arcus.
export const product = (): 'suite' | 'arcus' =>
  stripBase(location.pathname).startsWith('/arcus/') ? 'arcus' : 'suite';

export function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

// ── Streaming ask via SSE ────────────────────────────────────────────────────

export interface AskCallbacks {
  /** Retrieval/progress status line updates. */
  status: (text: string) => void;
  /** Called with the full accumulated markdown after each delta. */
  delta: (md: string) => void;
  /** Source links for the answer. */
  sources: (srcs: { url: string; title: string }[]) => void;
}

/** One prior turn of the conversation, oldest first. */
export interface AskTurn {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * POST the question to /api/ask and stream the answer. Throws if the API is
 * unavailable, or with an AbortError if `signal` aborts mid-stream (Stop).
 *
 * `history` carries the earlier turns so follow-up questions resolve; the API
 * bounds it, so passing the whole thread is safe.
 */
export async function streamAsk(
  question: string,
  cb: AskCallbacks,
  signal?: AbortSignal,
  history: AskTurn[] = [],
): Promise<void> {
  const resp = await fetch(ASK_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question, product: product(), history }),
    signal,
  });
  if (!resp.ok) throw new Error(`API responded ${resp.status}`);

  const reader = resp.body!.getReader();
  const decoder = new TextDecoder();
  let buf = '';
  let evt = '';
  let data = '';
  let answerMd = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });

    const lines = buf.split('\n');
    buf = lines.pop() ?? '';

    for (const line of lines) {
      if (line.startsWith('event: ')) {
        evt = line.slice(7).trim();
      } else if (line.startsWith('data: ')) {
        data = line.slice(6);
      } else if (line === '' && evt) {
        let payload: any;
        try { payload = JSON.parse(data); } catch { evt = ''; data = ''; continue; }
        if (evt === 'status') cb.status(payload.text);
        else if (evt === 'delta') { answerMd += payload.text; cb.delta(answerMd); }
        else if (evt === 'sources') cb.sources(payload as { url: string; title: string }[]);
        else if (evt === 'error') throw new Error(payload.message);
        evt = ''; data = '';
      }
    }
  }
}

// ── Copy affordances ─────────────────────────────────────────────────────────
// Delegated — the answer HTML is rebuilt on every stream delta, so listeners on
// the stable container survive. Handles both the code-block copy button and
// inline endpoint/URL chips.

function flashCopied(chip: HTMLElement) {
  const ic = chip.querySelector('.ts-ask-ic-btn');
  if (chip.classList.contains('is-copied')) return; // ignore rapid re-clicks mid-flash
  chip.classList.add('is-copied');
  chip.setAttribute('title', 'Copied');
  const prev = ic ? ic.innerHTML : '';
  if (ic) ic.innerHTML = IC_CHECK;
  setTimeout(() => {
    chip.classList.remove('is-copied');
    chip.setAttribute('title', 'Copy');
    if (ic) ic.innerHTML = prev;
  }, 1300);
}

function copyInlineChip(chip: HTMLElement) {
  const txt = chip.querySelector('.ts-ask-ic-txt')?.textContent || chip.textContent || '';
  navigator.clipboard?.writeText(txt.trim());
  flashCopied(chip);
}

export function bindCopyHandlers(container: HTMLElement) {
  container.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    const chip = target.closest('.ts-ask-inline-copy') as HTMLElement | null;
    if (chip) { copyInlineChip(chip); return; }

    const btn = target.closest('.ts-ask-copy') as HTMLElement | null;
    if (!btn) return;
    const codeEl = btn.closest('.ts-ask-codeblock')?.querySelector('code');
    if (!codeEl) return;
    navigator.clipboard?.writeText(codeEl.textContent || '');
    const lbl = btn.querySelector('.ts-ask-copy-text');
    if (lbl) { const prev = lbl.textContent; lbl.textContent = 'Copied'; setTimeout(() => { lbl.textContent = prev || 'Copy'; }, 1300); }
  });

  // Keyboard activation for inline copy chips (role="button").
  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const chip = (e.target as HTMLElement).closest('.ts-ask-inline-copy') as HTMLElement | null;
    if (!chip) return;
    e.preventDefault();
    copyInlineChip(chip);
  });
}

// ── Markdown renderer for the answer ─────────────────────────────────────────

// Inline formatting — `text` MUST already be HTML-escaped.
function inlineMd(text: string): string {
  // Split out inline-code spans; format only the non-code segments so
  // markdown inside backticks is left verbatim.
  return text.split(/(`[^`]+`)/).map((seg) => {
    if (seg.length > 1 && seg[0] === '`' && seg[seg.length - 1] === '`') {
      const inner = seg.slice(1, -1);
      // Endpoints and URLs get a click-to-copy affordance. `inner` is already
      // HTML-escaped, so &amp; etc. are decoded back to real chars on copy
      // (we copy the text node's textContent, not this escaped markup).
      const t = inner.trim();
      const copyable =
        /^https?:\/\/\S+$/.test(t) ||                                   // full URL
        /^\/[A-Za-z0-9_~%.\/:{}()[\]@&;=?+#-]*$/.test(t) ||             // /endpoint path
        /^(GET|POST|PUT|PATCH|DELETE|HEAD|OPTIONS)\s+\/\S+$/i.test(t);  // METHOD /path
      if (copyable) {
        return '<code class="ts-ask-inline-copy" role="button" tabindex="0" title="Copy">' +
                 `<span class="ts-ask-ic-txt">${inner}</span>` +
                 `<span class="ts-ask-ic-btn" aria-hidden="true">${IC_COPY}</span>` +
               '</code>';
      }
      return `<code>${inner}</code>`;
    }
    return seg
      // Links [label](url) — only safe schemes, else fall back to the label
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, label, url) =>
        /^(https?:\/\/|\/|#|mailto:)/i.test(url)
          // withBase is a no-op for external and anchor URLs; site-absolute doc
          // links written by the model need it or they 404 under the base.
          ? `<a href="${withBase(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`
          : label)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\[(\d+)\]/g, '<sup class="ts-ask-cite">[$1]</sup>');
  }).join('');
}

export function renderMarkdown(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  let html = '';
  let para: string[] = [];
  let i = 0;

  const flush = () => {
    if (para.length) { html += `<p>${inlineMd(escHtml(para.join(' ')))}</p>`; para = []; }
  };

  while (i < lines.length) {
    const line = lines[i];

    const fence = line.match(/^```(\w*)\s*$/);
    if (fence) {                                   // fenced code block
      flush();
      const lang = (fence[1] || '').toLowerCase();
      const buf: string[] = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++;                                         // skip closing fence (or run to EOF)
      const code = buf.join('\n');
      html +=
        '<div class="ts-ask-codeblock">' +
          '<div class="ts-ask-code-head">' +
            `<span class="ts-ask-code-lang">${escHtml(langLabel(lang))}</span>` +
            `<button type="button" class="ts-ask-copy" aria-label="Copy code">${IC_COPY}<span class="ts-ask-copy-text">Copy</span></button>` +
          '</div>' +
          `<pre class="ts-ask-pre"><code>${highlightCode(code, lang)}</code></pre>` +
        '</div>';
      continue;
    }

    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {                                       // heading
      flush();
      const lvl = h[1].length;
      html += `<h${lvl}>${inlineMd(escHtml(h[2].trim()))}</h${lvl}>`;
      i++; continue;
    }

    // GFM table: a header row followed by a |---|---| separator row.
    const isTableSep = (s: string) =>
      /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?\s*$/.test(s);
    const splitRow = (s: string) =>
      s.trim().replace(/^\|/, '').replace(/\|\s*$/, '').split('|').map((c) => c.trim());
    if (line.includes('|') && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flush();
      const header = splitRow(line);
      i += 2;                                      // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim() !== '' && lines[i].includes('|')) {
        rows.push(splitRow(lines[i])); i++;
      }
      let t = '<div class="ts-ask-tablewrap"><table class="ts-ask-table"><thead><tr>';
      for (const c of header) t += `<th>${inlineMd(escHtml(c))}</th>`;
      t += '</tr></thead><tbody>';
      for (const r of rows) {
        t += '<tr>';
        for (let c = 0; c < header.length; c++) t += `<td>${inlineMd(escHtml(r[c] || ''))}</td>`;
        t += '</tr>';
      }
      t += '</tbody></table></div>';
      html += t;
      continue;
    }

    if (/^>\s?/.test(line)) {                      // blockquote
      flush();
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) { buf.push(lines[i].replace(/^>\s?/, '')); i++; }
      html += `<blockquote>${inlineMd(escHtml(buf.join(' ')))}</blockquote>`;
      continue;
    }

    if (/^\s*[-*+]\s+/.test(line)) {               // unordered list
      flush();
      html += '<ul>';
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
        html += `<li>${inlineMd(escHtml(lines[i].replace(/^\s*[-*+]\s+/, '')))}</li>`; i++;
      }
      html += '</ul>';
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {               // ordered list
      flush();
      html += '<ol>';
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        html += `<li>${inlineMd(escHtml(lines[i].replace(/^\s*\d+\.\s+/, '')))}</li>`; i++;
      }
      html += '</ol>';
      continue;
    }

    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(line)) { // horizontal rule
      flush(); html += '<hr>'; i++; continue;
    }

    if (line.trim() === '') { flush(); i++; continue; }

    para.push(line.trim());                        // normal paragraph text
    i++;
  }
  flush();
  return html;
}

// ── Code block: language label + lightweight syntax highlighting ─────────────

const LANG_LABELS: Record<string, string> = {
  bash: 'Bash', sh: 'Shell', shell: 'Shell', console: 'Shell', zsh: 'Shell',
  powershell: 'PowerShell', ps: 'PowerShell', ps1: 'PowerShell',
  cmd: 'CMD', bat: 'Batch', json: 'JSON', yaml: 'YAML', yml: 'YAML',
  js: 'JavaScript', javascript: 'JavaScript', ts: 'TypeScript', typescript: 'TypeScript',
  java: 'Java', python: 'Python', py: 'Python', http: 'HTTP', xml: 'XML', html: 'HTML', sql: 'SQL',
};
function langLabel(lang: string): string {
  return LANG_LABELS[lang] || (lang ? lang.toUpperCase() : 'Code');
}

// Tiny, dependency-free highlighter. Walks the raw code with a prioritized
// list of sticky regexes so tokens never overlap; everything else is escaped
// verbatim. Token <span> classes are styled in Search.astro's global stylesheet.
function tokenize(code: string, specs: [RegExp, string][]): string {
  let out = '', i = 0;
  while (i < code.length) {
    let matched = false;
    for (const [re, cls] of specs) {
      re.lastIndex = i;
      const m = re.exec(code);
      if (m && m.index === i && m[0].length) {
        out += cls ? `<span class="hl-${cls}">${escHtml(m[0])}</span>` : escHtml(m[0]);
        i += m[0].length; matched = true; break;
      }
    }
    if (!matched) { out += escHtml(code[i]); i++; }
  }
  return out;
}

function highlightCode(code: string, lang: string): string {
  const SHELL: [RegExp, string][] = [
    [/#[^\n]*/y, 'comment'],
    [/"(?:[^"\\]|\\.)*"/y, 'string'],
    [/'(?:[^'\\]|\\.)*'/y, 'string'],
    [/https?:\/\/[^\s'"`)]+/y, 'url'],
    [/(?:--?[A-Za-z][\w-]*)/y, 'flag'],
    [/[|&;><]+/y, 'oper'],
    [/\b\d+(?:\.\d+)*\b/y, 'num'],
  ];
  const JSON_: [RegExp, string][] = [
    [/"(?:[^"\\]|\\.)*"(?=\s*:)/y, 'key'],
    [/"(?:[^"\\]|\\.)*"/y, 'string'],
    [/\b(?:true|false|null)\b/y, 'kw'],
    [/-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/y, 'num'],
  ];
  const GENERIC: [RegExp, string][] = [
    [/\/\/[^\n]*/y, 'comment'],
    [/#[^\n]*/y, 'comment'],
    [/"(?:[^"\\]|\\.)*"/y, 'string'],
    [/'(?:[^'\\]|\\.)*'/y, 'string'],
    [/`(?:[^`\\]|\\.)*`/y, 'string'],
    [/https?:\/\/[^\s'"`)]+/y, 'url'],
    [/\b\d+(?:\.\d+)?\b/y, 'num'],
  ];
  if (['json'].includes(lang)) return tokenize(code, JSON_);
  if (['bash','sh','shell','console','zsh','powershell','ps','ps1','cmd','bat','yaml','yml','http'].includes(lang) || !lang)
    return tokenize(code, SHELL);
  return tokenize(code, GENERIC);
}

/** Where votes are logged (see api/ask-feedback.ts). */
export const FEEDBACK_API_URL = '/api/ask-feedback';

/**
 * Report a thumbs up/down on an answer, with the sources that produced it.
 * Fire-and-forget: telemetry must never interrupt the reader, so all errors
 * are swallowed.
 */
export function sendFeedback(payload: {
  question: string;
  vote: 'up' | 'down';
  sources: { url: string; title: string }[];
  answerPreview: string;
}): void {
  try {
    const body = JSON.stringify({ ...payload, product: product() });
    // keepalive so the request survives the modal closing right after a click.
    void fetch(FEEDBACK_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch { /* ignore */ }
}
