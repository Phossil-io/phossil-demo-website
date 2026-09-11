import { useState } from 'react';
import './opening-preview.css';
import { providers } from './rollout-example';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const moments = [
  {label:'Explore why', kicker:'Make the connections visible', title:'Three updates. Not one simple answer.', text:'The date is a customer expectation. A passing unit test is not release readiness. And the same specialist is promised elsewhere. Phossil brings those relationships into view—without turning a possibility into a fact.', records:[['hubspot.svg','Customer commitment','Forty branches. One launch date.'],['github.svg','Engineering update','Unit tests pass. Sign-in test pending.'],['google-sheets.png','Capacity plan','One specialist. Two customers.']], cta:'Investigate in Explorer', surface:'explorer', stage:1, focus:'Separate what we know from what we need to resolve.'},
  {label:'Consider a next move', kicker:'Understanding becomes useful', title:'Some work can move. The release still waits.', text:'Prepare a phased plan, clarify staffing, and draft the next tasks in parallel. Keep customer agreement, security review, and launch authority explicit. The next move need not be a full rollout—or a complete stop.', records:[['jira.svg','Prepare the work','Draft a dependency checklist.'],['slack.png','Coordinate people','Resolve scope and staffing.'],['github.svg','Respect the boundary','Release remains conditional.']], cta:'Open the Flow Card', surface:'flow', stage:1, focus:'Move the preparation forward. Do not silently grant approval.'},
  {label:'See what happened', kicker:'Experience becomes a foundation', title:'One pilot. More than one thing to learn.', text:'Five branches were enabled. The observations inform the next rollout, a design investigation, and Sales’ readiness checklist. Future work can build on that experience—while rechecking what has changed.', records:[['github.svg','Action recorded','Five branches deployed.'],['google-sheets.png','Outcome observed','15 of 18 attempts unaided.'],['google-docs.png','Learning reviewed','Three follow-ups. Wider impact unknown.']], cta:'Inspect action & learning', surface:'workspace', stage:2, focus:'Keep the outcome, its limits, and the reasoning together.'},
];

export default function OpeningPreview({onExplore}:{onExplore:(surface:string,stage:number)=>void}) {
  const [selected,setSelected]=useState(0);
  const m=moments[selected];
  const sourceIds = [['interviews','code','continuity'],['proposal','proposal','proposal'],['release','results','learning']][selected];
  return <section className="opening-experiment" id="idea" aria-labelledby="preview-hero-title">
    <div className="preview-hero-copy wrap">
      <span className="eyebrow">An operating & learning layer for work · In development</span>
      <h1 id="preview-hero-title">Work creates<br />understanding.<br /><em>Build on it.</em></h1>
      <p>Across people, teams, systems, and time.<br />Connect what you know. Shape what comes next.<br />Learn from what actually happens.</p>
      <a className="preview-jump" href="#connection-story">See a connection become useful <ArrowRight size={20}/></a>
      <div className="strata-mark" aria-hidden="true"><img src="/brand/symbol-dark.svg" alt=""/><span>Information.<br />Relationships.<br />Reasoning.<br /><strong>Something to build on.</strong></span></div>
    </div>
    <div className="connection-story wrap" id="connection-story">
      <div className="connection-intro"><span className="eyebrow">A fictional moment at work</span><h2>Sales promised a date.<br />Engineering says “tests passed.”<br /><em>One specialist is booked twice.</em></h2><p>Would you launch? Delay? Ask a different question?<br />Choose a question. See what changes when the pieces connect.</p></div>
      <div className="connection-choices" role="group" aria-label="Explore the fictional situation">{moments.map((item,i)=><button key={item.label} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{item.label}<ArrowUpRight size={17}/></button>)}</div>
      <div className="connection-scene" key={selected}>
        <div className="connection-records">{m.records.map(([logo,title,detail], i)=><a className="connection-record" key={title} href={'/example-records.html#'+sourceIds[i]} target="_blank" rel="noreferrer"><img src={'/providers/'+logo} alt=""/><div><small>{title}</small><strong>{detail}</strong><small className="connection-source">{selected===1 ? 'Proposed work · inspect the draft brief ↗' : providers[sourceIds[i]].name+' · '+providers[sourceIds[i]].type+' ↗'}</small></div></a>)}<div className="connection-thread" aria-hidden="true"/></div>
        <div className="connection-understanding" aria-live="polite"><span className="eyebrow">{m.kicker}</span><h3>{m.title}</h3><p>{m.text}</p><div className="connection-focus"><img src="/brand/symbol-dark.svg" alt="Phossil"/><span>{m.focus}</span></div><button className="button ivory" onClick={()=>onExplore(m.surface,m.stage)}>{m.cta}<ArrowRight size={18}/></button></div>
      </div>
      <p className="connection-disclosure">Authored illustration—not live AI or connected systems. Open the product example to inspect the original fictional records.</p>
    </div>
  </section>;
}
