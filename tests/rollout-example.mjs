import assert from 'node:assert/strict';
import fs from 'node:fs';
import {records, providers, stages, relationships} from '../src/rollout-example.ts';

const library = fs.readFileSync(new URL('../public/example-records.html', import.meta.url), 'utf8');
const app = fs.readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const escape = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
assert.equal(records.length, 11);
assert.equal(new Set(Object.values(providers).map(p=>p.name)).size, 8);
for (const record of records) {
  assert(library.includes(`id="${record.id}"`));
  assert(library.includes(escape(record.text)), `Source preview drift: ${record.id}`);
  assert(relationships[record.id]);
  assert(fs.existsSync(new URL('../public'+providers[record.id].logo, import.meta.url)));
}
for (const stage of stages) for (const id of stage.sources) {
  const record = records.find(r=>r.id===id);
  assert(record, `Missing record ${id}`);
  assert(Number(record.date.split(' ')[1]) <= Number(stage.date.split(' ')[1]), `Future source ${id}`);
}
assert(!app.includes('className="work-document"'), 'Flow Card must not have a document beside it');
assert(app.includes('className="desktop-backdrop" aria-hidden="true"'), 'OS backdrop must be decorative, not another interactive surface');
assert(app.includes('Illustrated desktop · fictional'), 'OS backdrop must be labeled as fictional');
assert(app.includes("surface !== 'flow'"), 'Flow Card must not have surrounding application chrome');
assert(app.includes('pan.current.clientWidth / 760'));
assert(app.includes('pan.current.clientHeight / 960'));
assert(!app.includes('six-admin') && !app.includes('setup guide'), 'Old scenario copy remains');
for (const surface of ['messaging','flow','explorer']) assert(app.includes(`chatComposer('${surface}')`));
console.log('PASS: 11 source previews, 8 providers, temporal boundaries, standalone Flow Card, chat and canvas invariants.');
