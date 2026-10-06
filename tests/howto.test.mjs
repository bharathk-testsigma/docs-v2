import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractHowTos } from '../src/lib/howto.mjs';

test('one HowTo per <Steps> block, first paragraph of each item as plain text', () => {
	const body = `
## Export the log

\`\`\`md
## Not a heading
\`\`\`

<Steps>

1. Apply the **filters** on the [Audit Logs](/settings/audit-logs/)
   page.

   ![screenshot](x.png)

2. Click \`Export\`, then run \`use <project_id>\`.

   1. A nested sub-step that stays on the page.

</Steps>

## Single step

<Steps>

1. Only one.

</Steps>
`;
	assert.deepEqual(extractHowTos(body), [
		{
			name: 'Export the log',
			steps: ['Apply the filters on the Audit Logs page.', 'Click Export, then run use <project_id>.'],
		},
	]);
});
