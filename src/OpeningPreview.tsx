import { useState } from 'react';
import './opening-preview.css';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const moments = [
  {label:'Explore why', kicker:'Make the connections visible', title:'One launch. Different assumptions.', text:'A proposed phased launch is not an approved scope. Passing unit tests does not establish enterprise sign-in compatibility. The sales deck still promises that capability at launch. Connect the assumptions before treating the date, the tests and the claim as one reliable picture.', records:[['google-docs.png','Product scope','Two release paths proposed. Independence not confirmed.','scope','Google Docs · Planning document · May 8'],['github.svg','Engineering update','Unit tests pass. New-API integration tests remain.','engineering','GitHub · Pull request & test report · May 9'],['google-slides.png','Partner sales deck','“Enterprise SSO available at launch.” A draft claim.','marketing','Google Slides · Presentation, slide 6 · May 9']], cta:'Investigate in Explorer', surface:'explorer', stage:1, focus:'Separate what is proposed, what is verified and who can decide.'},
  {label:'Consider a next move', kicker:'Understanding becomes useful', title:'Keep preparation moving. Keep approval explicit.', text:'Draft alternate launch claims, prepare a different training exercise, and compare staffing and cost options in parallel. Engineering still needs to assess the shared identity code. Final release scope, security sign-off and incremental spending remain separate decisions.', records:[['google-slides.png','Prepare two messaging variants','Revise the deck without publishing an unverified claim.','marketing','Google Slides · Presentation, slide 6 · May 9'],['slack.png','Develop an alternate exercise','Prepare training. Verify the supported demo path.','enablement','Slack · Channel thread · May 9'],['google-sheets.png','Reconcile capacity','One specialist, two reservations. Compare coverage options.','operations','Google Sheets · Staffing spreadsheet · May 9']], cta:'Open the Flow Card', surface:'flow', stage:1, focus:'A useful next move can advance the work without pretending the whole launch is ready.'},
  {label:'What to learn', kicker:'Build a foundation for future work', title:'Keep the reasoning. Then test it against reality.', text:'After the launch decision and delivery, compare what happened with the assumptions behind the scope, claims, staffing and budget. Reviewed experience can inform another launch, a sales conversation or AI-assisted work. These May 9 records contain no verified launch outcome yet.', records:[['google-docs.png','Preserve the decision context','Which release path was chosen, and why?','scope','Google Docs · Planning document · May 8'],['jira.svg','Check what was actually cleared','A provisional review slot is not security approval.','security','Jira · Security review issue · May 9'],['google-sheets.png','Revisit the assumptions','Compare eventual costs with the forecast—not a presumed result.','finance','Google Sheets · Forecast scenario · May 9']], cta:'Inspect the shared launch context', surface:'workspace', stage:2, focus:'Learning requires reviewed decisions, actual actions and observed outcomes—not just saved plans.'},
];

export default function OpeningPreview({onExplore}:{onExplore:(surface:string,stage:number)=>void}) {
  const [selected,setSelected]=useState(0);
  const m=moments[selected];
  return <section className="opening-experiment" id="idea" aria-labelledby="preview-hero-title">
    <div className="preview-hero-copy wrap">
      <span className="eyebrow">An operating & learning layer for work · In development</span>
      <h1 id="preview-hero-title">Work creates<br />understanding.<br /><em>Build on it.</em></h1>
      <p>Across people, teams, systems, and time.<br />Connect what you know. Shape what comes next.<br />Learn from what actually happens.</p>
      <a className="preview-jump" href="#connection-story">See a connection become useful <ArrowRight size={20}/></a>
      <div className="strata-mark" aria-hidden="true"><img src="/brand/symbol-dark.svg" alt=""/><span>Information.<br />Relationships.<br />Reasoning.<br /><strong>Something to build on.</strong></span></div>
    </div>
    <div className="connection-story wrap" id="connection-story">
      <div className="connection-intro"><span className="eyebrow">A fictional moment at work · Atlas Q2 launch</span><h2>Sales is planning for Q2.<br />Engineering has an open dependency.<br /><em>The deck makes a claim not yet verified.</em></h2><p>Would you launch? Delay? Ask a different question?<br />Choose a question. See what changes when the pieces connect.</p></div>
      <div className="connection-choices" role="group" aria-label="Explore the fictional situation">{moments.map((item,i)=><button key={item.label} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{item.label}<ArrowUpRight size={17}/></button>)}</div>
      <div className="connection-scene" key={selected}>
        <div className="connection-records">{m.records.map(([logo,title,detail,id,meta])=><a className="connection-record" key={title} href={'/atlas-launch-records.html#'+id} target="_blank" rel="noreferrer"><img src={'/providers/'+logo} alt=""/><div><small>{title}</small><strong>{detail}</strong><small className="connection-source">{meta} · Fictional ↗</small></div></a>)}<div className="connection-thread" aria-hidden="true"/></div>
        <div className="connection-understanding" aria-live="polite"><span className="eyebrow">{m.kicker}</span><h3>{m.title}</h3><p>{m.text}</p><div className="connection-focus"><img src="/brand/symbol-dark.svg" alt="Phossil"/><span>{m.focus}</span></div><button className="button ivory" onClick={()=>onExplore(m.surface,m.stage)}>{m.cta}<ArrowRight size={18}/></button></div>
      </div>
      <p className="connection-disclosure">Authored illustration—not live AI or connected systems. Source links open the complete fictional records. No launch outcome has been established.</p>
    </div>
  </section>;
}
