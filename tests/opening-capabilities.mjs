import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const opening = readFileSync(new URL('../src/OpeningPreview.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../src/opening-preview.css', import.meta.url), 'utf8');
assert.match(opening, /<article className="connection-record"/);
assert.doesNotMatch(opening, /<a className="connection-record"|atlas-launch-records|Atlas|Q2|SSO|May 9/);
assert.doesNotMatch(css, /\.connection-record:hover/);
for (const label of ['Connect understanding', 'Move work forward', 'Learn through work']) assert.ok(opening.includes(label));
assert.ok(opening.includes('Capabilities in development'));
assert.ok(opening.includes('not currently available integrations'));
assert.ok(opening.includes('onExplore(m.surface,m.stage)'));
console.log('PASS: generalized opening, non-interactive illustrative cards, capability boundaries, and walkthrough links retained.');
