/**
 * Ask Assistant feedback sink.
 *
 * The drawer POSTs {question, vote, sources, answerPreview} here when a reader
 * rates an answer. Purpose: stop discovering bad answers by accident. Each
 * record carries the question AND the sources that were retrieved for it, so a
 * thumbs-down arrives with its own diagnosis attached — the retrieval trace
 * that otherwise has to be reconstructed by hand.
 *
 * Storage is deliberately dumb: one JSON line per vote to stdout, which lands
 * in the platform's function logs (Vercel: Runtime Logs, filter `[ask-feedback]`).
 * ponytail: no database — swap the console.log for a real store if/when the
 * volume justifies querying it. Reading a week of logs beats maintaining a table.
 *
 * Privacy: questions are user-typed and may contain anything, so nothing here
 * identifies the reader — no IP, no cookie, no session id. Do not add one.
 */

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  let body: {
    question?: string;
    vote?: string;
    sources?: { url?: string }[];
    answerPreview?: string;
  } = {};
  try {
    if (req.body && typeof req.body === 'object') {
      body = req.body;
    } else {
      const raw = typeof req.body === 'string' ? req.body : await readBodyText(req);
      body = JSON.parse(raw || '{}');
    }
  } catch { /* fall through to validation */ }

  const vote = body.vote === 'up' || body.vote === 'down' ? body.vote : null;
  const question = typeof body.question === 'string' ? body.question.trim() : '';
  if (!vote || !question) {
    res.status(400).json({ error: 'question and vote (up|down) are required' });
    return;
  }

  // Caps keep one pathological payload from flooding the logs.
  console.log('[ask-feedback] ' + JSON.stringify({
    at: new Date().toISOString(),
    vote,
    question: question.slice(0, 500),
    sources: (Array.isArray(body.sources) ? body.sources : [])
      .slice(0, 10)
      .map(s => (typeof s?.url === 'string' ? s.url.slice(0, 200) : ''))
      .filter(Boolean),
    answerPreview: typeof body.answerPreview === 'string' ? body.answerPreview.slice(0, 400) : '',
  }));

  res.status(204).end();
}

function readBodyText(req: any): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk: Buffer) => (data += chunk.toString()));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}
