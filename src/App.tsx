'use client';
/* Supplied local SVG logo artwork is kept unmodified; raster optimization is unnecessary. */
/* oxlint-disable next/no-img-element */
import { useState, useRef, type SubmitEvent } from 'react';
import {
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Maximize2,
  Move,
  Check,
  MessageSquare,
  Layers,
  LayoutGrid,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
const calendar = 'https://calendar.app.google/dVxeTjcLc9DGcFRU6';
const records = [
  {
    id: 'continuity',
    name: 'Maya’s shared working note',
    date: 'May 7',
    author: 'Maya · Customer Success',
    text: 'Maya records her stopping point: I am comparing a setup guide with a product redesign. No approach has been selected. I want to compare the customer accounts with Product and Support before recommending a trial. This note is shared with the example team; it is not a private note transferred by opening Workspace.',
  },
  {
    id: 'interviews',
    name: 'Customer interview notes',
    date: 'May 6',
    author: 'Maya · Customer Success',
    text: 'Three customers said they did not know what to do after creating an account. Sales notes say these customers wanted to invite their colleagues and start using the software together. This describes the interviewed customers, not every customer.',
  },
  {
    id: 'support',
    name: 'Support conversation',
    date: 'May 7',
    author: 'Jon · Support',
    text: 'Jon reports repeated questions about adding teammates. He initially describes this as a permissions problem. His follow-up clarifies that some customers cannot find the invitation step; whether permissions also prevent others from continuing has not been checked.',
  },
  {
    id: 'proposal',
    name: 'Options and AI draft review',
    date: 'May 9',
    author: 'Maya · Customer Success; Leo · Product',
    text: 'Maya had paused while comparing a setup guide with a product redesign. Leo estimates that a redesign would take longer; a guide can be tried without changing the product. An AI assistant drafts a guide from the permitted setup instructions. Maya corrects its assumption: only account admins can invite teammates. The draft is revised; Maya still needs to check every step. Alex, the pilot owner, has not yet approved the proposed six-customer trial. AI may draft, not approve or publish.',
  },
  {
    id: 'decision',
    name: 'Trial decision and delivery',
    date: 'May 12',
    author: 'Alex · Pilot owner; Maya · Customer Success',
    text: 'Alex approves a trial with six new customer admins, not a company-wide rollout. The decision favors a guide to test whether clearer instructions help before investing in a redesign. Maya records that she reviewed the guide, sent it to those six participants, and observed their first setup sessions. Approval, delivery, and outcome are recorded separately.',
  },
  {
    id: 'results',
    name: 'Six-customer trial observations',
    date: 'May 16',
    author: 'Maya · Customer Success',
    text: 'Four of six customer admins completed setup without assistance. Two needed help finding the invitation step. These are observed trial results. There was no comparison group; the results do not prove the guide improved setup, retention, or revenue.',
  },
  {
    id: 'learning',
    name: 'Reviewed learning and follow-up',
    date: 'May 17',
    author: 'Maya · Customer Success; Leo · Product',
    text: 'Maya and Leo review the trial observations. They retain two points: the instructions must distinguish admins from teammates, and two of six admins needed help locating invitations. Leo takes the invitation-step question into a separate navigation-design investigation. Maya prepares another guide version. These follow-ups are not completed changes. Larger accounts and other roles need their own evidence; the trial is not a universal rule.',
  },
];
const providers: Record<string, { name: string; type: string; logo: string }> =
  {
    continuity: {
      name: 'Google Docs',
      type: 'Document',
      logo: '/providers/google-docs.png',
    },
    interviews: {
      name: 'Google Docs',
      type: 'Interview document',
      logo: '/providers/google-docs.png',
    },
    support: {
      name: 'Slack',
      type: 'Message thread',
      logo: '/providers/slack.png',
    },
    proposal: {
      name: 'Google Docs',
      type: 'Draft document',
      logo: '/providers/google-docs.png',
    },
    decision: {
      name: 'Slack',
      type: 'Decision & delivery thread',
      logo: '/providers/slack.png',
    },
    results: {
      name: 'Google Sheets',
      type: 'Spreadsheet',
      logo: '/providers/google-sheets.png',
    },
    learning: {
      name: 'Google Docs',
      type: 'Review document',
      logo: '/providers/google-docs.png',
    },
  };

const stages = [
  {
    label: 'Understand the problem',
    heading: 'Why are customers getting stuck?',
    status: 'Question open',
    question: 'Is this a product problem, or do people need better guidance?',
    answer:
      'Sales describes what customers hoped to do. Interviews show where they lost their way. Support points to invitations. Together, these suggest a place to investigate—not a settled explanation.',
    idea: 'Compare a setup guide with a product change',
    note: 'We have not established the cause for every customer.',
    next: 'Compare the two approaches with Product and Support',
    left: 'Comparing a setup guide with a product redesign.',
    changed:
      'Support has clarified where customers need help: inviting teammates.',
    impact:
      'The next comparison should focus on that step, not the whole setup process.',
    unknown: 'Are people unable to invite colleagues, or unable to find how?',
    record: 'support',
    sources: ['interviews', 'support', 'continuity'],
    date: 'May 7',
  },
  {
    label: 'Develop and try an approach',
    heading: 'Test an idea before a wider rollout.',
    status: 'Proposal under review',
    question: 'What could we try, and what should the AI help with?',
    answer:
      'A guide lets the team try clearer instructions before investing in a redesign. AI can draft from the setup instructions; Maya checks the steps. Her correction—only admins can invite teammates—changes both the draft and who should join the trial.',
    idea: 'Try a reviewed guide with six customer admins',
    note: 'Alex has not approved the trial yet. AI cannot approve or publish it.',
    next: 'Maya checks the guide; Alex decides the trial scope',
    left: 'Comparing a guide with a redesign; no approach was selected.',
    changed:
      'Product proposed a guide trial. Maya corrected the AI draft: invitations require an admin.',
    impact: 'Revise the guide and limit the proposed trial to admins.',
    unknown: 'Will clearer instructions actually help?',
    record: 'proposal',
    sources: ['interviews', 'support', 'proposal'],
    date: 'May 9',
  },
  {
    label: 'Learn and carry it forward',
    heading: 'What happened—and what changes next?',
    status: 'Results reviewed',
    question: 'What can this experience inform beyond the trial?',
    answer:
      'Four of six admins completed setup unaided; two needed help finding invitations. Maya and Leo reviewed this. It informs the next guide and a separate product-design question, without proving a wider benefit or applying the result to every customer.',
    idea: 'Improve the guide; investigate invitation visibility',
    note: 'Follow-up work is proposed. Wider results remain unknown.',
    next: 'Maya revises the guide; Leo investigates the invitation step',
    left: 'Preparing a six-customer trial, pending Alex’s decision.',
    changed:
      'Alex approved the trial. Maya ran it. Results and a joint review are now available.',
    impact:
      'The next guide must explain admin roles; Product has a specific design question to investigate.',
    unknown:
      'Would a different design help? Does the same issue affect larger customers?',
    record: 'results',
    sources: ['proposal', 'decision', 'results', 'learning'],
    date: 'May 17',
  },
];
export default function Home() {
  const [surface, setSurface] = useState('messaging'),
    [stage, setStage] = useState(0),
    [sourceOpen, setSourceOpen] = useState(false),
    [sourceId, setSourceId] = useState('support'),
    [workTab, setWorkTab] = useState('overview'),
    [flowHidden, setFlowHidden] = useState(false),
    [flowCollapsed, setFlowCollapsed] = useState(false),
    [flowQuestion, setFlowQuestion] = useState(false),
    [zoom, setZoom] = useState(100),
    [hand, setHand] = useState(false),
    [space, setSpace] = useState(false),
    [formStatus, setFormStatus] = useState(''),
    [draft, setDraft] = useState('');
  const [chatDrafts, setChatDrafts] = useState<Record<string, string>>({});
  const [chatMessages, setChatMessages] = useState<
    Record<string, { role: string; text: string }[]>
  >({});
  const [preparedAction, setPreparedAction] = useState<Record<number, string>>(
    {},
  );
  const pan = useRef<HTMLDivElement>(null),
    drag = useRef<{ x: number; y: number; left: number; top: number } | null>(
      null,
    );
  const s = stages[stage];
  const selectedRecord = records.find((r) => r.id === sourceId) ?? records[0];
  const source = (id: string = s.record) => {
    const r = records.find((item) => item.id === id)!;
    const provider = providers[id];
    return (
      <button
        className="source-chip"
        onClick={() => {
          setSourceId(id);
          setSourceOpen(true);
        }}
      >
        <img src={provider.logo} alt={provider.name} />
        <span>
          {r.name}
          <small>
            {provider.name} · {provider.type}
            <br />
            Fictional · {r.date}
          </small>
        </span>
        <ArrowUpRight size={16} />
      </button>
    );
  };
  const contextSources = () => (
    <div className="context-sources">
      <p className="source-label">Sources behind this account · fictional</p>
      <div className="visible-source-list">
        {s.sources.map((id) => (
          <div key={id}>{source(id)}</div>
        ))}
      </div>
    </div>
  );
  const submitChat = (kind: string, text: string, authored = false) => {
    if (!text.trim()) return;
    const key = kind + ':' + stage;
    const reply = authored
      ? s.answer
      : 'This is an interactive product concept, not live AI. Your message is shown here but has not been sent. Try the example question to see a prepared response, or inspect the source records.';
    setChatMessages((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] ?? []),
        { role: 'You', text: text.trim() },
        { role: 'Phossil · simulated', text: reply },
      ],
    }));
    setChatDrafts((prev) => ({ ...prev, [key]: '' }));
  };
  const chatComposer = (kind: string) => {
    const key = kind + ':' + stage;
    return (
      <div className="chat-interaction">
        <div className="demo-chat-log" aria-live="polite">
          {(chatMessages[key] ?? []).map((m, i) => (
            <div
              key={i}
              className={
                m.role === 'You'
                  ? 'chat-bubble user-bubble'
                  : 'chat-bubble ai-bubble'
              }
            >
              <small>{m.role}</small>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
        <button
          className="example-prompt"
          onClick={() => submitChat(kind, s.question, true)}
        >
          Try an example question <ChevronRight size={14} />
        </button>
        <form
          className="chat-compose"
          onSubmit={(e) => {
            e.preventDefault();
            submitChat(kind, chatDrafts[key] ?? '');
          }}
        >
          <label htmlFor={'compose-' + kind}>
            {kind === 'messaging'
              ? 'Reply to Phossil'
              : kind === 'flow'
                ? 'Ask about this work'
                : 'Ask Phossil'}
          </label>
          <textarea
            id={'compose-' + kind}
            value={chatDrafts[key] ?? ''}
            onChange={(e) =>
              setChatDrafts((prev) => ({ ...prev, [key]: e.target.value }))
            }
            rows={2}
            maxLength={2000}
            placeholder={
              kind === 'messaging'
                ? 'Ask, clarify, or correct…'
                : 'What would you like to understand or do?'
            }
            onKeyDown={(e) => {
              if (
                e.key === 'Enter' &&
                !e.shiftKey &&
                !e.nativeEvent.isComposing
              ) {
                e.preventDefault();
                submitChat(kind, chatDrafts[key] ?? '');
              }
            }}
          />
          <div>
            <small>Simulated · stays in this tab</small>
            <button type="submit" disabled={!(chatDrafts[key] ?? '').trim()}>
              Send <ArrowUpRight size={15} />
            </button>
          </div>
        </form>
      </div>
    );
  };
  const actionDraft =
    stage === 0
      ? 'Jon and Leo — can we compare where customers get stuck before choosing between a guide and a product change?'
      : stage === 1
        ? 'Alex — please review the proposed six-admin trial. I will check the guide’s steps before any customer receives it.'
        : 'Leo — can we investigate the invitation step? Two of six admins needed help there. This does not establish the same problem for every customer.';
  const goWorkspace = (tab = 'overview') => {
    setWorkTab(tab);
    setSurface('workspace');
  };
  const storyControls = (
    <div className="story-controls">
      <span>Choose a moment in the story</span>
      <div>
        {stages.map((item, index) => (
          <button
            key={item.record}
            aria-pressed={index === stage}
            onClick={() => {
              setStage(index);
              setFlowQuestion(false);
            }}
          >
            <span>0{index + 1}</span>
            {item.label}
            <ChevronRight size={16} />
          </button>
        ))}
      </div>
    </div>
  );

  function prepareEmail(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const v = new FormData(e.currentTarget);
    const field = (key: string) => {
      const value = v.get(key);
      return typeof value === 'string' ? value : '';
    };
    const text = `Name: ${field('name')}\nEmail: ${field('email')}\nOrganization: ${field('organization') || 'Not provided'}\n\n${field('message')}`;
    setDraft(text);
    setFormStatus(
      'Your email draft is ready. Send it from your email app, or copy the message. Nothing has been submitted by this page.',
    );
    window.location.href = `mailto:teamphossil@gmail.com?subject=${encodeURIComponent('Let’s talk about Phossil')}&body=${encodeURIComponent(text)}`;
  }
  return (
    <main>
      <a className="skip-link" href="#idea">
        Skip to content
      </a>
      <div className="opening">
        <header className="site-nav wrap">
          <a href="#idea" aria-label="Phossil home">
            <img className="brand" src="/brand/logo-dark.svg" alt="Phossil" />
          </a>
          <nav aria-label="Main navigation">
            <a href="#idea">The idea</a>
            <a href="#experience">The experience</a>
            <a href="#research">Research</a>
            <a className="nav-contact" href="#contact">
              Talk with us <ArrowUpRight size={17} />
            </a>
          </nav>
        </header>
        <section className="hero wrap" id="idea">
          <div className="hero-top">
            <span className="eyebrow">
              An operating & learning layer for work
            </span>
            <span className="quiet-tag">In development</span>
          </div>
          <h1>
            Work creates understanding.
            <br />
            <em>Build on it.</em>
          </h1>
          <div className="hero-bottom">
            <p>
              Phossil connects the information, relationships, and reasoning
              behind work—across people, teams, systems, and time. So
              understanding can guide what you do next, and grow from what
              happens.
            </p>
            <div className="hero-actions">
              <a className="button ivory" href="#experience">
                See the experience <ArrowRight size={18} />
              </a>
              <a className="text-link" href="#contact">
                Talk with us <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </section>
        <div className="hero-foot wrap">
          <span>Individual understanding. Collective capability.</span>
          <span>01 — The experience ↓</span>
        </div>
      </div>
      <section className="foundation wrap" aria-labelledby="foundation-title">
        <div>
          <span className="eyebrow">The idea, in practice</span>
          <h2 id="foundation-title">
            Your tools hold the pieces.
            <br />
            Phossil connects their meaning.
          </h2>
        </div>
        <div>
          <p>
            A customer conversation, a project plan, a colleague’s judgment, an
            AI draft: each holds part of the story. The important
            connections—and the reasons behind them—can be hard to carry into
            the next conversation or decision.
          </p>
          <p>
            We’re building a foundation people can inspect and improve together.
            Use it to explore questions, develop ideas, coordinate, decide, and
            act. Then connect what was decided with what was done and what
            resulted, so reviewed experience can inform future work.
          </p>
        </div>
      </section>
      <section className="experience wrap" id="experience">
        <div className="section-heading">
          <div>
            <span className="eyebrow">A connected experience</span>
            <h2>
              Alongside your work.
              <br />
              Room to go deeper.
            </h2>
          </div>
          <p>
            Start where the work is happening. A relevant update can arrive in
            your team chat; you can reply there, open a desktop Flow Card, or
            investigate in Workspace. You can also begin directly in any of
            them. Explorer brings conversation and a canvas into Workspace when
            a question needs room.
          </p>
        </div>
        <div className="entry-points" aria-label="Ways to use Phossil">
          <div>
            <strong>In your team chat</strong>
            <p>
              Receive a relevant update, ask a question, clarify, or coordinate
              without leaving the conversation.
            </p>
          </div>
          <div>
            <strong>Beside your current work</strong>
            <p>
              Open Flow Card to recover the thread, ask Phossil, and prepare a
              useful next action.
            </p>
          </div>
          <div>
            <strong>Inside Workspace</strong>
            <p>
              Investigate, explore connections, collaborate, make decisions, and
              follow what happens.
            </p>
          </div>
        </div>
        <p className="nonlinear-note">
          Choose the depth you need. These are connected entry points, not steps
          in a required funnel. Context follows you; access and sharing
          boundaries still apply.
        </p>
        <div className="scenario-intro">
          <span className="eyebrow">
            A fictional example · a software company
          </span>
          <h3>
            Customers buy the software.
            <br />
            Then struggle to get started.
          </h3>
          <p>
            You’re Maya in Customer Success. Sales knows what customers
            expected. Support hears where they get stuck. Product can change the
            experience. You want to work out what would help—not jump straight
            to a solution.
          </p>
          <p className="scenario-question">
            Follow how an initial question becomes a team experiment, then
            learning that informs more than one piece of work.
          </p>
        </div>
        {storyControls}
        <Tabs value={surface} onValueChange={(v) => setSurface(String(v))}>
          <div className="surface-bar">
            <TabsList
              className="surface-list"
              aria-label="Product concept views"
            >
              <TabsTrigger value="messaging">
                <img
                  className="tab-provider"
                  src="/providers/slack.png"
                  alt="Slack"
                />{' '}
                Messaging
              </TabsTrigger>
              <TabsTrigger value="flow">
                <MessageSquare size={17} /> Flow Card
              </TabsTrigger>
              <TabsTrigger value="explorer">
                <Layers size={17} /> Explorer
              </TabsTrigger>
              <TabsTrigger value="workspace">
                <LayoutGrid size={17} /> Workspace
              </TabsTrigger>
            </TabsList>
            <span className="concept-label">
              Interactive product concept · fictional example
            </span>
          </div>
          <div className="demo-shell">
            <div className="demo-top">
              <span className="demo-brand">
                <img src="/brand/symbol-light.svg" alt="" /> PHOSSIL
              </span>
              <span>
                {surface === 'flow'
                  ? 'Your desktop · Flow Card beside your work'
                  : surface === 'messaging'
                    ? 'Team messaging · fictional Slack example'
                    : 'Phossil Workspace / Customer setup'}
              </span>
              <span className="avatar" aria-label="Illustrative user Maya">
                M
              </span>
            </div>

            <TabsContent value="messaging" className="demo-content">
              <div className="messaging-scene">
                <aside className="messaging-sidebar">
                  <img src="/providers/slack.png" alt="Slack" />
                  <strong>Example company</strong>
                  <span># customer-setup</span>
                  <small>
                    Fictional channel
                    <br />
                    No live connection
                  </small>
                </aside>
                <section
                  className="message-thread"
                  aria-label="Example team chat"
                >
                  <header>
                    <strong># customer-setup</strong>
                    <span>Maya · Jon · Leo · Alex</span>
                  </header>
                  <div className="native-message">
                    <img src="/brand/symbol-light.svg" alt="Phossil" />
                    <div>
                      <strong>
                        Phossil <small>Example enabled update · {s.date}</small>
                      </strong>
                      <p>{s.changed}</p>
                      <p className="why-notified">
                        Why this reached Maya: she follows customer setup, and
                        this update affects the question she is working on. Only
                        permitted context belongs in this channel.
                      </p>
                      {source()}
                      <div className="message-actions">
                        <button
                          onClick={() => {
                            setSurface('flow');
                            setFlowHidden(false);
                          }}
                        >
                          Open Flow Card
                        </button>
                        <button onClick={() => goWorkspace()}>
                          Open in Workspace
                        </button>
                        <button onClick={() => setSurface('explorer')}>
                          Explore the question
                        </button>
                      </div>
                    </div>
                  </div>
                  {chatComposer('messaging')}
                  <p className="messaging-boundary">
                    Reply here or open another view—neither is mandatory. This
                    preview does not send Slack messages.
                  </p>
                </section>
              </div>
            </TabsContent>
            <TabsContent value="workspace" className="demo-content">
              <div className="workspace-grid">
                <aside
                  className="product-sidebar"
                  aria-label="Illustrative Workspace destinations"
                >
                  <span className="sidebar-title">Phossil Workspace</span>
                  <span>Home</span>
                  <span>Company</span>
                  <span>Movement</span>
                  <strong>Work</strong>
                  <button onClick={() => setSurface('explorer')}>
                    Explorer <ArrowUpRight size={14} />
                  </button>
                  <span>Memory</span>
                  <small>
                    Destinations shown for context.
                    <br />
                    Work and Explorer previewed here.
                  </small>
                </aside>
                <div className="work-main">
                  <div className="work-title">
                    <div>
                      <span className="eyebrow">Work / Customer setup</span>
                      <h3>{s.heading}</h3>
                    </div>
                    <span className="status-tag">{s.status}</span>
                  </div>
                  <p className="work-purpose">
                    Help new customers start using the software with their
                    teammates.
                  </p>
                  <div className="scope-strip">
                    <span>Maya · coordinates</span>
                    <span>Leo · Product</span>
                    <span>Jon · Support</span>
                    <span>Alex · trial decision</span>
                  </div>
                  <Tabs
                    value={workTab}
                    onValueChange={(v) => setWorkTab(String(v))}
                  >
                    <TabsList
                      className="work-tabs"
                      aria-label="Situation areas"
                    >
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="sources">Sources</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                      <TabsTrigger value="decision">
                        Options & decision
                      </TabsTrigger>
                      <TabsTrigger value="outcome">
                        Action & learning
                      </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                      <div className="work-columns">
                        <article className="work-card">
                          <span className="card-label">
                            Current understanding · {s.date}
                          </span>
                          <h4>{s.idea}</h4>
                          <p>{s.answer}</p>
                          {contextSources()}
                          <button
                            className="inline-action"
                            onClick={() => setSurface('explorer')}
                          >
                            Explore the connections <ArrowRight size={15} />
                          </button>
                        </article>
                        <article className="work-card next-card">
                          <span className="card-label">What can move next</span>
                          <h4>{s.next}</h4>
                          <p>{s.note}</p>
                          <dl className="readiness">
                            <dt>Work we can continue</dt>
                            <dd>
                              {stage === 2
                                ? 'Prepare follow-up ideas.'
                                : 'Investigate and prepare a proposal.'}
                            </dd>
                            <dt>Trial decision</dt>
                            <dd>
                              {stage === 2
                                ? 'Alex approved six admins only.'
                                : stage === 1
                                  ? 'Not approved. Alex decides scope.'
                                  : 'No trial proposed yet; compare approaches.'}
                            </dd>
                            <dt>Still unknown</dt>
                            <dd>{s.unknown}</dd>
                          </dl>
                          <button
                            className="button deep small"
                            onClick={() =>
                              setWorkTab(stage === 2 ? 'outcome' : 'decision')
                            }
                          >
                            {stage === 2
                              ? 'Inspect action & learning'
                              : 'Compare options & responsibilities'}{' '}
                            <ArrowRight size={16} />
                          </button>
                        </article>
                      </div>
                    </TabsContent>
                    <TabsContent value="sources">
                      <div className="workspace-detail">
                        <h4>Inspect the records behind this view.</h4>
                        <p>
                          Only the example records available by {s.date} are
                          used here. No live customer systems are connected.
                        </p>
                        <div className="evidence-grid">
                          {s.sources.map((id) => (
                            <div key={id}>{source(id)}</div>
                          ))}
                        </div>
                        <p className="unknown-note">
                          Coverage is limited. Interviews are accounts from
                          specific people; a proposal is not a decision; a trial
                          is not proof of a company-wide result.
                        </p>
                      </div>
                    </TabsContent>
                    <TabsContent value="history">
                      <div className="workspace-detail">
                        <h4>What was known then—not just what we know now.</h4>
                        <ol className="record-timeline">
                          <li>
                            <strong>May 6–7 · Question opened</strong>
                            <p>
                              Customer and Support accounts point to setup
                              friction. The cause remains open.
                            </p>
                            {source('support')}
                          </li>
                          {stage >= 1 && (
                            <li>
                              <strong>
                                May 9 · Proposed approach and correction
                              </strong>
                              <p>
                                Maya corrects the AI draft: only admins can
                                invite teammates. The guide and trial audience
                                need to reflect that.
                              </p>
                              {source('proposal')}
                            </li>
                          )}
                          {stage === 2 && (
                            <li>
                              <strong>
                                May 12–17 · Decision, trial, review
                              </strong>
                              <p>
                                Approval and delivery were recorded before the
                                results. The team then reviewed what those
                                results can—and cannot—teach them.
                              </p>
                              {source('decision')}
                              {source('results')}
                              {source('learning')}
                            </li>
                          )}
                        </ol>
                      </div>
                    </TabsContent>
                    <TabsContent value="decision">
                      <div className="workspace-detail">
                        <h4>A choice with reasons—not an AI verdict.</h4>
                        <div className="option-grid">
                          <article>
                            <strong>Clarify the setup guide</strong>
                            <p>
                              Try clearer instructions without changing the
                              product. Might not solve a usability or permission
                              problem.
                            </p>
                          </article>
                          <article>
                            <strong>Redesign the invitation step</strong>
                            <p>
                              Could address the interface itself. Product needs
                              to investigate scope and effort.
                            </p>
                          </article>
                        </div>
                        <p>
                          {stage === 0
                            ? 'These are possibilities for discussion. The team has not selected an approach.'
                            : stage === 1
                              ? 'Proposed: test a reviewed guide with six customer admins before investing in a redesign. The trial limits exposure while the team learns.'
                              : 'Recorded decision: Alex approved the six-admin trial. This was not approval to roll out to every customer.'}
                        </p>
                        {source(
                          stage === 0
                            ? 'support'
                            : stage === 1
                              ? 'proposal'
                              : 'decision',
                        )}
                        {stage >= 1 && (
                          <div className="ai-brief">
                            <span className="card-label">
                              AI contribution · illustrative
                            </span>
                            <p>
                              <strong>Task:</strong> draft the guide from
                              permitted setup instructions.{' '}
                              <strong>Review:</strong> Maya checks the steps and
                              corrects the admin-role assumption.{' '}
                              <strong>Boundary:</strong> no approval,
                              publishing, or customer contact by AI.
                            </p>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    <TabsContent value="outcome">
                      <div className="workspace-detail">
                        <h4>
                          Approval, action, result, and learning stay distinct.
                        </h4>
                        {stage < 2 ? (
                          <>
                            <p>
                              The trial has not run at this point in the story.
                              There is no outcome to report.
                            </p>
                            <button
                              className="button outline small"
                              onClick={() => setStage(2)}
                            >
                              Jump to the later trial & review{' '}
                              <ArrowRight size={15} />
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="outcome-grid">
                              <article>
                                <span>Decision</span>
                                <strong>Six-admin trial approved</strong>
                                <p>Alex · May 12</p>
                              </article>
                              <article>
                                <span>Action recorded</span>
                                <strong>Guide reviewed and tested</strong>
                                <p>Maya observed six setup sessions.</p>
                              </article>
                              <article>
                                <span>Result observed</span>
                                <strong>4 of 6 finished unaided</strong>
                                <p>Two needed help finding invitations.</p>
                              </article>
                            </div>
                            {source('decision')}
                            {source('results')}
                            <div className="learning-return">
                              <span className="card-label">
                                Reviewed learning → future work
                              </span>
                              <h4>One experience. Two next directions.</h4>
                              <p>
                                <strong>Maya’s next guide:</strong> explain
                                admin roles clearly.{' '}
                                <strong>Leo’s product investigation:</strong>{' '}
                                examine whether invitations are hard to find.
                                Both retain the original observations and
                                limits.
                              </p>
                              <p>
                                These are follow-ups, not completed
                                improvements. No comparison group means we
                                cannot claim the guide caused better outcomes.
                                Other roles and larger customers still need
                                investigation.
                              </p>
                              {source('learning')}
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                  <p className="workspace-boundary">
                    Shared team context · {s.date} · Your private questions are
                    not shared simply by opening this view.
                  </p>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="explorer" className="demo-content">
              <div className="explorer-grid">
                <aside className="chat-panel">
                  <span className="eyebrow">Explore with Phossil</span>
                  <div className="chat-question">
                    <small>Maya asks</small>
                    {s.question}
                  </div>
                  <div className="chat-answer">
                    <img src="/brand/symbol-light.svg" alt="Phossil" />
                    <p>{s.answer}</p>
                  </div>
                  {chatComposer('explorer')}
                  {contextSources()}
                  <div className="chat-bottom">
                    <p>Prepared conversation · not live AI</p>
                    <button
                      className="button outline small"
                      onClick={() => goWorkspace()}
                    >
                      Return to the work <ArrowRight size={15} />
                    </button>
                  </div>
                </aside>
                <div className="canvas-panel">
                  <div className="canvas-tools">
                    <span>Connections</span>
                    <div>
                      <button
                        onClick={() => setZoom(Math.max(30, zoom - 10))}
                        aria-label="Zoom out"
                      >
                        <Minus size={16} />
                      </button>
                      <output aria-label="Canvas zoom">{zoom}%</output>
                      <button
                        onClick={() => setZoom(Math.min(150, zoom + 10))}
                        aria-label="Zoom in"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setZoom(
                            pan.current
                              ? Math.min(
                                  100,
                                  Math.floor(
                                    (pan.current.clientWidth / 660) * 100,
                                  ),
                                )
                              : 70,
                          );
                          pan.current?.scrollTo(0, 0);
                        }}
                        aria-label="Fit canvas"
                      >
                        <Maximize2 size={16} />
                      </button>
                      <button
                        onClick={() => setHand(!hand)}
                        aria-label="Hand tool"
                        aria-pressed={hand}
                      >
                        <Move size={16} />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`canvas-viewport ${hand || space ? 'grabbable' : ''}`}
                    ref={pan}
                    role="application"
                    tabIndex={0}
                    aria-label="Exploration canvas. Hold Space and drag, use the hand tool, or scroll to pan."
                    onKeyDown={(e) => {
                      if (e.code === 'Space' && e.target === e.currentTarget) {
                        e.preventDefault();
                        setSpace(true);
                      }
                    }}
                    onKeyUp={(e) => {
                      if (e.code === 'Space') setSpace(false);
                    }}
                    onBlur={() => {
                      setSpace(false);
                      drag.current = null;
                    }}
                    onPointerDown={(e) => {
                      if (!(hand || space) || !pan.current) return;
                      e.preventDefault();
                      drag.current = {
                        x: e.clientX,
                        y: e.clientY,
                        left: pan.current.scrollLeft,
                        top: pan.current.scrollTop,
                      };
                      e.currentTarget.setPointerCapture(e.pointerId);
                    }}
                    onPointerMove={(e) => {
                      if (!drag.current || !pan.current) return;
                      pan.current.scrollLeft =
                        drag.current.left - (e.clientX - drag.current.x);
                      pan.current.scrollTop =
                        drag.current.top - (e.clientY - drag.current.y);
                    }}
                    onPointerUp={() => {
                      drag.current = null;
                    }}
                    onPointerCancel={() => {
                      drag.current = null;
                    }}
                  >
                    <div
                      style={{
                        width: (660 * zoom) / 100,
                        height: (650 * zoom) / 100,
                        minWidth: '100%',
                      }}
                    >
                      <div
                        className="canvas-world"
                        style={{ transform: `scale(${zoom / 100})` }}
                      >
                        <div className="map-center">
                          <small>The shared question</small>
                          <h4>
                            Help customers
                            <br />
                            complete setup
                          </h4>
                        </div>
                        <div className="map-branches">
                          <article>
                            <small>Customer & Support accounts</small>
                            <strong>“How do I invite my team?”</strong>
                            <span>Related accounts · not a proven cause</span>
                          </article>
                          <article className="map-selected">
                            <small>{s.status}</small>
                            <strong>{s.idea}</strong>
                            <span>{s.note}</span>
                          </article>
                        </div>
                        <div className="map-record map-source-grid">
                          {s.sources.map((id) => (
                            <div key={id}>{source(id)}</div>
                          ))}
                        </div>
                        <p className="map-caption">
                          {stage === 2
                            ? 'Reviewed learning informs both the guide and Product’s investigation.'
                            : 'Inspect the source. Challenge the explanation. Develop another possibility.'}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="canvas-footer">
                    Same question. More room to think.
                    <span>Space + drag to pan</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="flow" className="demo-content">
              <div className="flow-scene">
                <div className="work-document">
                  <span className="eyebrow">Document open on your desktop</span>
                  <h3>
                    Helping customers
                    <br />
                    get started
                  </h3>
                  <p>Maya’s working notes · fictional</p>
                  <hr />
                  <h4>Our aim</h4>
                  <p>
                    Help customers set up an account and invite teammates,
                    without needing someone to walk them through every step.
                  </p>
                  <h4 className="document-section">Working question</h4>
                  <p>
                    Would clearer instructions help—or does the product need to
                    change?
                  </p>
                  <p className="desktop-note">
                    Flow Card is a separate desktop panel, not a card embedded
                    inside Workspace.
                  </p>
                </div>
                {flowHidden ? (
                  <button
                    className="button deep reopen-flow"
                    onClick={() => {
                      setFlowHidden(false);
                      setFlowCollapsed(false);
                    }}
                  >
                    Open Flow Card
                  </button>
                ) : (
                  <aside className="flow-card">
                    <div className="flow-card-head">
                      <img src="/brand/symbol-light.svg" alt="Phossil" />
                      <span>Flow Card</span>
                      <div className="flow-window-controls">
                        <button
                          aria-label={
                            flowCollapsed
                              ? 'Expand Flow Card'
                              : 'Collapse Flow Card'
                          }
                          onClick={() => setFlowCollapsed(!flowCollapsed)}
                        >
                          {flowCollapsed ? (
                            <Plus size={16} />
                          ) : (
                            <Minus size={16} />
                          )}
                        </button>
                        <button
                          aria-label="Dismiss Flow Card"
                          onClick={() => setFlowHidden(true)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                    <span className="card-label">
                      Opened by you · Your view
                    </span>
                    <h4>Customer setup</h4>
                    {!flowCollapsed && (
                      <>
                        <p className="flow-purpose">
                          Help new customers get started with their team.
                        </p>
                        <dl className="continuity-fields">
                          <dt>Where you left off</dt>
                          <dd>{s.left}</dd>
                          <dt>What changed · {s.date}</dt>
                          <dd>{s.changed}</dd>
                          <dt>
                            What this may change <span>Interpretation</span>
                          </dt>
                          <dd>{s.impact}</dd>
                          <dt>Still unresolved</dt>
                          <dd>{s.unknown}</dd>
                        </dl>
                        <div className="flow-next">
                          <span className="card-label">
                            A possible next action
                          </span>
                          <p>{s.next}</p>
                          <div>
                            <button
                              onClick={() =>
                                setPreparedAction((prev) => ({
                                  ...prev,
                                  [stage]: actionDraft,
                                }))
                              }
                            >
                              Prepare a reply
                            </button>
                            <button onClick={() => setFlowHidden(true)}>
                              Continue in my document
                            </button>
                          </div>
                          {preparedAction[stage] !== undefined && (
                            <div className="prepared-action">
                              <label htmlFor="flow-action">
                                Reply draft · review before sharing
                              </label>
                              <textarea
                                id="flow-action"
                                rows={4}
                                value={preparedAction[stage]}
                                onChange={(e) =>
                                  setPreparedAction((prev) => ({
                                    ...prev,
                                    [stage]: e.target.value,
                                  }))
                                }
                              />
                              <small>
                                Prepared locally. Not sent to a channel or
                                written to your document.
                              </small>
                              <button
                                onClick={() => {
                                  setChatDrafts((prev) => ({
                                    ...prev,
                                    ['messaging:' + stage]:
                                      preparedAction[stage],
                                  }));
                                  setSurface('messaging');
                                }}
                              >
                                Review in messaging example
                              </button>
                            </div>
                          )}
                        </div>
                        {chatComposer('flow')}
                        {contextSources()}
                        <button
                          className="inline-action"
                          onClick={() => setFlowQuestion(!flowQuestion)}
                          aria-expanded={flowQuestion}
                        >
                          Why might this matter for my work?
                        </button>
                        {flowQuestion && (
                          <p className="bounded-answer">
                            <strong>Prepared answer:</strong> {s.next}. {s.note}{' '}
                            This is a suggested continuation, not a required
                            action.
                          </p>
                        )}
                        <button
                          className="button deep"
                          onClick={() => goWorkspace()}
                        >
                          Open in Workspace <ArrowUpRight size={17} />
                        </button>
                        <small>
                          Same work and history. Private questions stay private.
                          <br />
                          Hiding this panel does not resolve the work.
                        </small>
                      </>
                    )}
                  </aside>
                )}
              </div>
            </TabsContent>
          </div>
        </Tabs>
        <p className="demo-disclosure">
          Product concept, not a live application. The controls replay authored
          examples; AI responses, people, records, and results are fictional. No
          systems are connected and no business actions are taken.
        </p>
      </section>
      <section className="understanding">
        <div className="wrap understanding-inner">
          <div className="layer-mark">
            <img src="/brand/symbol-dark.svg" alt="" />
            <span className="eyebrow">Understanding, carried forward</span>
          </div>
          <div>
            <h2>
              More than the
              <br />
              work you produce.
            </h2>
            <p className="large-copy">
              The possibilities you see.
              <br />
              The judgment you develop.
              <br />
              The experience you can build on.
            </p>
            <p>
              An individual can develop an idea using context they can trust.
              Colleagues can bring different perspectives to the same work. AI
              can contribute with relevant sources, instructions, and limits.
              Each contribution can improve the foundation others build on—where
              sharing is permitted.
            </p>
          </div>
        </div>
      </section>
      <section className="principles wrap">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Understanding → action → learning</span>
            <h2>
              One foundation.
              <br />
              Many ways forward.
            </h2>
          </div>
          <p>
            The example is customer setup; the capability is broader. Planning a
            launch, investigating a delay, developing a new service, or
            directing AI work all draw on information, relationships, and
            reasoning. Phossil is designed to carry that understanding across
            these activities—not impose one workflow.
          </p>
        </div>
        <div className="principle-grid">
          <article>
            <span>01 / Understand</span>
            <h3>See the connections.</h3>
            <p>
              Connect Phossil to the apps and sources where work happens, within
              the access you allow. Bring information, relationships, and reasoning
              into an evolving picture you can inspect and correct—while keeping
              the original sources within reach.
            </p>
          </article>
          <article>
            <span>02 / Move</span>
            <h3>Put understanding to work.</h3>
            <p>
              Move work forward—from everyday tasks to complex, evolving efforts
              across teams. Explore possibilities, create, coordinate, decide,
              and act in the tools you use. Phossil is designed to support both
              established workflows and work whose next steps are still taking
              shape, with clear responsibilities and human authority.
            </p>
          </article>
          <article>
            <span>03 / Learn</span>
            <h3>Build on experience.</h3>
            <p>
              Connect decisions with what was done and what actually happened.
              Reviewed experience gives people and AI a foundation for future
              action: relevant context, prior reasoning, and lessons they can
              inspect and question. AI can act within granted permissions;
              new outcomes inform what to carry forward, revise, or leave behind.
            </p>
          </article>
        </div>
        <div className="trust-strip">
          <span>
            <Check size={17} /> Sources you can inspect
          </span>
          <span>
            <Check size={17} /> Understanding you can correct
          </span>
          <span>
            <Check size={17} /> Human authority preserved
          </span>
        </div>
      </section>
      <section className="research-feature wrap" id="research">
        <div>
          <span className="eyebrow">The argument behind Phossil</span>
          <h2>
            Work creates understanding.
            <br />
            What if we could keep building on it?
          </h2>
          <p>
            How understanding can inform ideas, coordination, decisions, and
            action—and improve through what happens next.
          </p>
          <a className="research-read" href="/research.html">
            Read the short version <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="research-depth">
          <h3>Read the research. Question the thesis.</h3>
          <p>
            Three detailed cases, supporting research and counterevidence, a
            fair look at existing tools, and a plan to test what Phossil must
            get right.
          </p>
          <a href="/phossil-white-paper.html">Read the full paper</a>
          <a href="/phossil-white-paper.pdf" download>
            Download PDF
          </a>
          <small>
            A research-backed position paper. Proposed capabilities, not
            demonstrated product results.
          </small>
        </div>
      </section>
      <section className="founder wrap">
        <span className="eyebrow">Why we’re building Phossil</span>
        <blockquote>
          “What mattered wasn’t just the deliverables. It was the understanding
          developed through the work—and how that understanding helped us see
          possibilities, exercise judgment, and shape what came next.”
        </blockquote>
        <div>
          <span className="founder-monogram">EE</span>
          <p>
            <strong>Eric Espinel</strong>
            <br />
            Founder · Drawing on cross-functional work at Visa
          </p>
        </div>
      </section>
      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div>
            <span className="eyebrow">Let’s think forward, together</span>
            <h2>
              What could your
              <br />
              organization
              <br />
              <em>build on?</em>
            </h2>
            <p>
              We’re at the prototype stage, developing the experience and
              testing where it creates meaningful value. If you’re exploring
              this problem—or the company we’re building—we’d like to talk.
            </p>
            <a
              className="button ivory"
              href={calendar}
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a time to talk <ArrowUpRight size={18} />
            </a>
            <a className="email-link" href="mailto:teamphossil@gmail.com">
              teamphossil@gmail.com
            </a>
          </div>
          <form onSubmit={prepareEmail}>
            <h3>Or start with a message.</h3>
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Alex Morgan"
                />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={200}
                  placeholder="alex@company.com"
                />
              </label>
            </div>
            <label>
              Organization <span>(optional)</span>
              <input
                name="organization"
                autoComplete="organization"
                maxLength={150}
                placeholder="Where you work or invest"
              />
            </label>
            <label>
              What would you like to explore?
              <textarea
                name="message"
                required
                maxLength={3000}
                rows={4}
                placeholder="Tell us what brought you here…"
              />
            </label>
            <p className="form-note">
              This form prepares an email in your email app. You review and
              send it there. The website does not store your entries.
            </p>
            <button className="button ivory" type="submit">
              Continue to email <ArrowRight size={17} />
            </button>
            <output aria-live="polite" className="form-status">
              {formStatus}
            </output>
            {draft && (
              <button
                type="button"
                className="text-link"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(draft);
                    setFormStatus(
                      'Message copied. Paste it into an email to teamphossil@gmail.com.',
                    );
                  } catch {
                    setFormStatus(
                      'Clipboard access is unavailable. You can select and copy your message from the form.',
                    );
                  }
                }}
              >
                Copy message instead
              </button>
            )}
          </form>
        </div>
      </section>
      <footer className="wrap">
        <a href="#idea" aria-label="Back to top">
          <img src="/brand/logo-light.svg" alt="Phossil" />
        </a>
        <p>Understanding that grows through work.</p>
        <span>
          © {new Date().getFullYear()} Phossil · Product in development
        </span>
      </footer>
      <Dialog open={sourceOpen} onOpenChange={setSourceOpen}>
        <DialogContent className="source-dialog">
          <DialogTitle>{selectedRecord.name}</DialogTitle>
          <DialogDescription>
            Fictional source · {providers[selectedRecord.id].name} ·{' '}
            {providers[selectedRecord.id].type} · HTML preview
          </DialogDescription>
          <img
            className="inspector-provider"
            src={providers[selectedRecord.id].logo}
            alt={providers[selectedRecord.id].name}
          />
          <p className="source-byline">
            {selectedRecord.author} · {selectedRecord.date}
          </p>
          <p>{selectedRecord.text}</p>
          <p className="source-boundary">
            This record belongs to the illustrated situation. It is not customer
            evidence or a connected integration.
          </p>
          <a
            className="button deep"
            href={`/example-records.html#${selectedRecord.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open example source passage <ExternalLink size={16} />
          </a>
        </DialogContent>
      </Dialog>
    </main>
  );
}
