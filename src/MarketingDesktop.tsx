import './marketing-desktop.css';

function WindowDots() {
  return <span className="md-window-dots"><i /><i /><i /></span>;
}

/** Fictional ambient desktop: never interactive and never a source of product evidence. */
export default function MarketingDesktop() {
  return (
    <div className="marketing-desktop" aria-hidden="true">
      <div className="md-menubar">
        <span className="md-menu-left"><b>●</b><strong>Chrome</strong><span>File</span><span>Edit</span><span>View</span><span>History</span><span>Window</span></span>
        <span>◉ &nbsp; ◔ &nbsp; ▰ &nbsp; Thu 10:55 AM</span>
      </div>
      <div className="md-fiction-label">Illustrated macOS desktop · fictional partner marketing work</div>

      <div className="md-window md-slack-window">
        <div className="md-slack-top"><WindowDots /><div>⌕ &nbsp; Search Atlas</div><span>◷</span></div>
        <div className="md-slack-layout">
          <aside className="md-slack-sidebar">
            <h3>Atlas <span>⌄</span></h3>
            <div>⌂ &nbsp; Home</div><div>▢ &nbsp; DMs</div><div>♧ &nbsp; Activity</div><div>⋯ &nbsp; More</div>
            <small>⌄ &nbsp; Channels</small>
            <div># &nbsp; product</div><div className="md-channel-selected"># &nbsp; partner-launch</div><div># &nbsp; partner-marketing</div><div># &nbsp; revenue-team</div>
            <small>⌄ &nbsp; Direct messages</small>
            <div><span className="md-person-avatar">SP</span> Sam Park</div><div><span className="md-person-avatar md-avatar-green">AR</span> Alex Rivera</div>
          </aside>
          <div className="md-slack-messages">
            <header><b># partner-launch</b><span>♧ &nbsp; ⌕ &nbsp; ⋯</span></header>
            <div className="md-slack-message"><span className="md-person-avatar md-avatar-green">AR</span><div><b>Alex Rivera <time>10:42 AM</time></b><p>Can we use the Q2 partner deck for next week’s sales training?</p></div></div>
            <div className="md-slack-message"><span className="md-person-avatar">MC</span><div><b>Maya Chen <time>10:44 AM</time></b><p>I’m updating the launch story and partner talk track. The integration slide still needs Product’s review.</p><div className="md-slack-reaction">👀 &nbsp; 3 &nbsp; &nbsp; 2 replies</div></div></div>
            <div className="md-slack-message"><span className="md-person-avatar md-avatar-blue">SP</span><div><b>Sam Park <time>10:48 AM</time></b><p>We can draft alternate versions of the deck. Keep enterprise SSO marked “under review” until we validate the new-user path.</p></div></div>
            <div className="md-slack-compose">Message #partner-launch<span>＋ &nbsp; ☺ &nbsp; @ &nbsp; Aa <b>➤</b></span></div>
          </div>
        </div>
      </div>

      <div className="md-window md-slides-window">
        <div className="md-browser-tabs"><WindowDots /><span>▦ &nbsp; Partner launch brief</span><span className="md-active-tab">▣ &nbsp; Q2 partner sales deck ×</span><span>▤ &nbsp; Partner portal</span><b>＋</b></div>
        <div className="md-addressbar"><span>‹ &nbsp; › &nbsp; ↻</span><div>▧ &nbsp; docs.google.com/presentation/d/q2-partner-deck/edit</div><span>☆ &nbsp; ⋮</span></div>
        <div className="md-slides-heading"><img className="md-slides-icon" src="/providers/google-slides.png" alt=""/><div><strong>Q2 partner sales deck</strong><span>File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Slide &nbsp; Arrange &nbsp; Tools</span></div><span className="md-share">Share</span></div>
        <div className="md-slides-toolbar">↶ &nbsp; ↷ &nbsp; ▣ &nbsp; ▾ &nbsp; | &nbsp; 75% ⌄ &nbsp; | &nbsp; ↖ &nbsp; T &nbsp; ▧ &nbsp; ◇ &nbsp; | &nbsp; Arial ⌄ &nbsp; 24 &nbsp; <b>B</b> &nbsp; <i>I</i> &nbsp; <u>U</u> &nbsp; ≡</div>
        <div className="md-slides-editor">
          <aside className="md-slide-thumbs"><div><small>1</small><span>Atlas<br /><b>Built for<br />your next chapter.</b></span></div><div><small>2</small><span>THE OPPORTUNITY<br /><b>Better together.</b></span></div><div className="md-thumb-selected"><small>3</small><span>PARTNER ENABLEMENT<br /><b>One story.<br />A useful next step.</b></span></div><div><small>4</small><span>LAUNCH READINESS<br /><b>What’s ready.<br />What’s next.</b></span></div></aside>
          <div className="md-slide-stage"><div className="md-main-slide"><small>ATLAS / PARTNER ENABLEMENT / Q2</small><h3>Help partners sell<br />with confidence.</h3><p>A clear customer story. The right resources.<br />An honest view of what is ready.</p><div className="md-slide-pill">Customer story</div><div className="md-slide-pill">Demo & talk track</div><div className="md-slide-foot">WORKING DRAFT · PRODUCT REVIEW PENDING <span>03</span></div></div><div className="md-speaker-notes">Speaker notes &nbsp; · &nbsp; Confirm integration wording with Product before distribution.</div></div>
        </div>
      </div>

      <div className="md-window md-sheets-window">
        <div className="md-sheet-title"><WindowDots /><img src="/providers/google-sheets.png" alt="" /><strong>Q2 partner marketing plan</strong><span>☆ &nbsp; ☁</span></div>
        <div className="md-sheet-menu">File &nbsp; Edit &nbsp; View &nbsp; Insert &nbsp; Format &nbsp; Data &nbsp; Tools &nbsp; Extensions</div>
        <div className="md-sheet-formula"><span>C4 &nbsp;⌄</span><i>fx</i> &nbsp; 8500</div>
        <table><thead><tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th></tr></thead><tbody>
          <tr className="md-sheet-headers"><th>1</th><td>Workstream</td><td>Owner</td><td>Plan ($)</td><td>Dependency</td></tr>
          <tr><th>2</th><td>Partner sales deck</td><td>Maya</td><td>2,400</td><td>Product review</td></tr>
          <tr><th>3</th><td>Sales enablement</td><td>Jordan</td><td>3,200</td><td>Final talk track</td></tr>
          <tr><th>4</th><td>Partner webinar</td><td>Maya</td><td className="md-active-cell">8,500</td><td>Speaker confirmed</td></tr>
          <tr><th>5</th><td>Portal updates</td><td>Casey</td><td>1,800</td><td>Approved content</td></tr>
          <tr><th>6</th><td>Co-marketing</td><td>Jordan</td><td>12,000</td><td>Partner sign-off</td></tr>
          <tr className="md-sheet-total"><th>7</th><td>Planning total</td><td></td><td>27,900</td><td>Draft · not approved</td></tr>
        </tbody></table>
        <div className="md-sheet-tabs">＋ &nbsp; ≡ &nbsp; <b>Q2 plan ⌄</b> &nbsp; Campaigns &nbsp; Enablement</div>
      </div>

      <div className="md-calendar-notification"><span className="md-calendar-icon"><small>THU</small><b>14</b></span><div><small>CALENDAR <span>now</span></small><strong>Team all-hands</strong><p>In 5 minutes · 11:00–11:30 AM</p></div></div>
      <div className="md-dock"><span className="md-finder-icon">◡</span><span className="md-browser-icon">◉</span><img src="/providers/slack.png" alt="" /><img src="/providers/google-slides.png" alt=""/><img src="/providers/google-sheets.png" alt="" /><span className="md-dock-calendar">14</span><i /><img src="/brand/symbol-light.svg" alt="" /></div>
    </div>
  );
}
