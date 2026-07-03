// ─────────────────────────────────────────────────────────────────────────────
//  gen-help-redirects.mjs  (Help Tab Implementation — Phase 1, §5)
//
//  Generates 301 redirects from each page's OLD /help/ URL to its NEW URL,
//  driven entirely by scripts/help-move-map.json (the single source of truth,
//  itself generated from the actual `git mv` renames in migrate-help-content.sh).
//  This guarantees the redirect list can never drift from what actually moved.
//
//  Run:  node scripts/gen-help-redirects.mjs
//  Then append public/_redirects-help-additions.txt into public/_redirects.
// ─────────────────────────────────────────────────────────────────────────────
import { readFileSync, writeFileSync } from 'fs';

// One entry per moved file: { from, to } — paths relative to suite/, no .md.
const moves = JSON.parse(readFileSync('scripts/help-move-map.json', 'utf8'));

const lines = moves.map(({ from, to }) =>
  `/docs/suite/${from}/   /docs/suite/${to}/   301`
);

writeFileSync('public/_redirects-help-additions.txt', lines.join('\n') + '\n');
console.log(`Generated ${lines.length} redirects`);
