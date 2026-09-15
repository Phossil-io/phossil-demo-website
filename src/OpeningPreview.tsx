import { useState } from 'react';
import './opening-preview.css';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const moments = [
  {label:'Connect understanding', kicker:'Make the connections visible', title:'More than information. Understanding you can build on.', text:'Phossil is designed to connect the apps and sources where work happens—bringing information, relationships, and reasoning into a picture people can inspect and improve. Explore questions, develop ideas, uncover dependencies, and understand different perspectives across individual work, teams, and the organization.', records:[['google-docs.png','Plans & ideas','Goals, proposals, and the thinking behind them.','Google Docs · Documents'],['slack.png','Conversations & perspectives','Questions, commitments, and knowledge shared through work.','Slack · Messages & threads'],['github.svg','Work & dependencies','Changes, contributions, and how work connects.','GitHub · Issues & pull requests']], cta:'See Explorer in practice', surface:'explorer', stage:1, focus:'Keep what is known, inferred, disputed, and still missing distinct—and correct the picture as understanding develops.'},
  {label:'Move work forward', kicker:'Put understanding to work', title:'From an open question to responsible action.', text:'Use that understanding to create and review work, compare approaches, coordinate responsibilities, and act in the tools you already use. From a personal task to a complex, changing cross-functional initiative, Phossil is designed to support the next useful move without forcing every situation into one workflow.', records:[['google-slides.png','Create & develop','Turn understanding into ideas and deliverables.','Google Slides · Presentations'],['jira.svg','Coordinate & act','Connect responsibilities, dependencies, and next steps.','Jira · Issues & work tracking'],['google-sheets.png','Compare & decide','Weigh options, resources, constraints, and tradeoffs.','Google Sheets · Spreadsheets']], cta:'See Flow Card in practice', surface:'flow', stage:1, focus:'People and AI can contribute within clear permissions, while human authority over consequential decisions stays intact.'},
  {label:'Learn through work', kicker:'Let experience inform what comes next', title:'Keep the understanding. Grow the capability.', text:'Connect what was decided with what was actually done and what happened afterward. Preserve the reasoning, review outcomes, and incorporate corrections so useful experience can inform new questions, different teams, and future action—not just repeat an old answer.', records:[['google-docs.png','Decisions & reasoning','Preserve the choices, context, and judgment behind work.','Google Docs · Documents'],['github.svg','Actions & changes','Trace what was carried out—not only what was planned.','GitHub · Pull requests & activity'],['google-sheets.png','Outcomes & learning','Compare expectations with results and revisit assumptions.','Google Sheets · Measurements & analysis']], cta:'See Workspace in practice', surface:'workspace', stage:2, focus:'Reviewed experience gives people and AI a stronger foundation to work from, with its limits, uncertainty, and authority still visible.'},
];

export default function OpeningPreview({onExplore}:{onExplore:(surface:string,stage:number)=>void}) {
  const [selected,setSelected]=useState(0);
  const m=moments[selected];
  return <section className="opening-experiment" id="idea" aria-labelledby="preview-hero-title">
    <div className="preview-hero-copy wrap">
      <span className="eyebrow">An operating & learning layer for work · In development</span>
      <h1 id="preview-hero-title">Work creates<br />understanding.<br /><em>Build on it.</em></h1>
      <p>Across people, teams, systems, and time.<br />Connect what you know. Shape what comes next.<br />Learn from what actually happens.</p>
      <a className="preview-jump" href="#connection-story">See how understanding becomes useful <ArrowRight size={20}/></a>
      <div className="strata-mark" aria-hidden="true"><img src="/brand/symbol-dark.svg" alt=""/><span>Information.<br />Relationships.<br />Reasoning.<br /><strong>Something to build on.</strong></span></div>
    </div>
    <div className="connection-band"><div className="connection-story wrap" id="connection-story">
      <div className="connection-intro"><span className="eyebrow">A shared foundation for work</span><h2>Connect understanding.<br />Move work forward.<br /><em>Learn from what happens.</em></h2><p>For individuals, teams, and organizations—working independently, together, or with AI. Explore how Phossil is designed to make understanding useful across the work, not just within one task.</p></div>
      <div className="connection-choices" role="group" aria-label="Explore Phossil capabilities">{moments.map((item,i)=><button key={item.label} aria-pressed={selected===i} onClick={()=>setSelected(i)}>{item.label}<ArrowUpRight size={17}/></button>)}</div>
      <div className="connection-scene" key={selected}>
        <div className="connection-records">{m.records.map(([logo,title,detail,meta])=><article className="connection-record" key={title}><img src={'/providers/'+logo} alt=""/><div><small>{title}</small><strong>{detail}</strong><small className="connection-source">{meta}</small></div></article>)}<div className="connection-thread" aria-hidden="true"/></div>
        <div className="connection-understanding" aria-live="polite"><span className="eyebrow">{m.kicker}</span><h3>{m.title}</h3><p>{m.text}</p><div className="connection-focus"><img src="/brand/symbol-dark.svg" alt="Phossil"/><span>{m.focus}</span></div><button className="button ivory" onClick={()=>onExplore(m.surface,m.stage)}>{m.cta}<ArrowRight size={18}/></button></div>
      </div>
      <p className="connection-disclosure">Capabilities in development. App logos illustrate the kinds of sources Phossil is designed to connect—not currently available integrations. Explore the fictional product walkthroughs below.</p>
    </div></div>
  </section>;
}
