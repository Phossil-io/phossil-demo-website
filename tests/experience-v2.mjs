import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const read = (path) => fs.readFileSync(new URL(path, import.meta.url), 'utf8');
const experience = read('../src/ExperienceV2.tsx');
const finance = read('../src/FinanceWorkspace.tsx');
const launch = read('../src/LaunchExplorer.tsx');
const desktop = read('../src/MarketingDesktop.tsx');
const launchCss = read('../src/launch-explorer.css');
const desktopCss = read('../src/marketing-desktop.css');

// Evaluate only a named, static authored fixture declaration, never a component.
function fixture(source, name) {
  const ast = ts.createSourceFile('fixture.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let initializer;
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (declaration.name.getText(ast) === name) initializer = declaration.initializer?.getText(ast);
    }
  }
  assert(initializer, `Fixture declaration ${name} must exist`);
  return vm.runInNewContext(`(${initializer})`, Object.create(null), { timeout: 100 });
}

const launchRecords = fixture(experience, 'launchRecords');
const streams = fixture(launch, 'workstreams');
const financeRecords = fixture(finance, 'financeRecords');
assert.equal(launchRecords.length, 4);
assert.equal(streams.length, 7);
assert.equal(financeRecords.length, 7);
for (const record of [...launchRecords, ...streams, ...financeRecords]) {
  assert(record.app && record.type && record.logo, 'Every source must identify its app, record type and logo');
  assert(record.text || record.excerpt, 'Every source must have inspectable authored content');
  assert(fs.existsSync(new URL(`../public/providers/${record.logo}`, import.meta.url)), `Missing logo ${record.logo}`);
}
assert.equal(new Set(streams.map((item) => item.team)).size, 7);
for (const stream of streams) {
  assert(stream.owner && stream.rationale && stream.unknown && stream.next, `Missing reasoning/authority for ${stream.id}`);
  assert(Number(stream.date.split(' ')[1]) <= 9, `Future record in May 9 investigation: ${stream.id}`);
}

assert(experience.includes("scenario==='finance'"));
assert(experience.includes('<FinanceWorkspace/>'));
assert(experience.includes('A separate fictional finance situation'));
assert(experience.includes("['messaging','flow','explorer','workspace']"));
assert(experience.includes('<MarketingDesktop/>'));
assert(experience.includes('<LaunchExplorer/>'));
for (const state of ['drafts[surface]', 'conversations[surface]', 'preparedViews[surface]']) {
  assert(experience.includes(state), `Private state must remain surface-scoped: ${state}`);
}
assert(experience.includes("composer('Message #q2-launch')"));
assert(experience.includes("composer('Ask about this deck or the launch…')"));
assert(experience.includes('Illustration only · no live AI or messages sent'));
assert(experience.includes('account, not a verified boundary'));
assert(experience.includes('shared-code impact remains unverified'));
assert(!experience.includes('Northstar'), 'Old scenario must not leak into the launch example');

assert(desktop.includes('aria-hidden="true"'));
assert(desktopCss.includes('pointer-events:none'));
for (const feature of ['md-slack-sidebar', 'md-browser-tabs', 'md-slides-editor', 'md-sheets-window', 'Team all-hands', 'In 5 minutes']) {
  assert(desktop.includes(feature), `Missing desktop feature: ${feature}`);
}
assert(desktop.includes('WORKING DRAFT · PRODUCT REVIEW PENDING'));
assert(desktop.includes('Draft · not approved'));
assert.equal(2400 + 3200 + 8500 + 1800 + 12000, 27900, 'Desktop planning total must reconcile');

assert(launch.includes('aria-label="Explorer conversation"'));
assert(launch.includes('<textarea id="launch-question"'));
assert(launch.includes('setPointerCapture(event.pointerId)'));
assert(launch.includes("event.code === 'Space'"));
assert(launch.includes('ArrowLeft: [-80, 0]'));
assert(launch.includes('aria-label="Fit launch canvas"'));
assert(launch.includes('Math.max(0.2, value - 0.1)'));
assert(launch.includes('height: 960 * zoom'));
assert(launchCss.includes('height:570px;min-height:570px;max-height:570px'));
assert(launchCss.includes('height:450px;min-height:450px;max-height:450px'));
assert(launch.includes('not a proven causal chain'));
assert(launch.includes('There is no verified launch outcome'));
assert(launch.includes('{record.text}'));

// Execute the component's arithmetic expressions, so changes to the implementation
// (not a copied test formula) must still satisfy the displayed scenario figures.
const expressions = ['receipts', 'payments', 'closing'].map((name) => {
  const expression = finance.match(new RegExp(`const ${name} = ([^;]+);`))?.[1];
  assert(expression, `Missing forecast expression ${name}`);
  return `const ${name} = ${expression};`;
}).join('\n');
for (const test of [
  { delayed: false, hires: false, defer: false, expected: 1600 },
  { delayed: true, hires: false, defer: false, expected: 1150 },
  { delayed: true, hires: true, defer: false, expected: 970 },
  { delayed: true, hires: true, defer: true, expected: 1030 },
  { delayed: true, hires: false, defer: true, expected: 1150 },
]) {
  const actual = vm.runInNewContext(`${expressions}\nclosing`, { ...test }, { timeout: 100 });
  assert.equal(actual, test.expected, `Cash calculation drift: ${JSON.stringify(test)}`);
}
for (const text of ['Overview', 'Sources', 'Options & decision', 'Action & learning', 'not the lowest weekly balance', 'Decision pending', 'Decision and outcomes not yet available', 'not an external accounting standard', 'these are incremental amounts', 'do not add it again']) {
  assert(finance.includes(text), `Missing finance boundary/control: ${text}`);
}
assert(finance.includes('ref={inspector} tabIndex={-1}'));
assert(finance.includes('{record.excerpt}'));
assert(finance.includes('not live AI or financial advice'));
console.log('PASS: 18 typed source fixtures, provider assets, seven-team reasoning, isolated chats, desktop surfaces, fixed-size canvas navigation, and five cash scenarios. Source-level regression only; browser verification remains separate.');
