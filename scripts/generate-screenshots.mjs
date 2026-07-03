import { mkdirSync, writeFileSync } from 'node:fs';

mkdirSync('docs/screenshots', { recursive: true });

function card(x, y, w, h, title, body, accent = '#2f4a42') {
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="#fffaf1" stroke="#e2d4c1" />
  <rect x="${x + 18}" y="${y + 18}" width="92" height="24" rx="12" fill="#e4efe8" />
  <text x="${x + 30}" y="${y + 35}" font-size="11" font-weight="700" fill="${accent}">${title}</text>
  <text x="${x + 18}" y="${y + 72}" font-size="20" font-weight="800" fill="#20322d">${body[0]}</text>
  <text x="${x + 18}" y="${y + 102}" font-size="13" fill="#62574d">${body[1]}</text>
  <text x="${x + 18}" y="${y + 128}" font-size="13" fill="#62574d">${body[2]}</text>`;
}

function shell(width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#f6f0e7" />
  <style>text{font-family:Inter,Arial,sans-serif}</style>
  ${content}
</svg>`;
}

const dashboardDesktop = shell(1440, 1100, `
  <rect x="0" y="0" width="1440" height="260" fill="#efe2cf" />
  <text x="56" y="56" font-size="18" font-weight="800" fill="#20322d">Sales Command Center</text>
  <text x="56" y="120" font-size="58" font-weight="900" fill="#20322d">Decide the next best sales move</text>
  <text x="56" y="170" font-size="24" fill="#526158">A calm cockpit for priority, prep, follow-up, momentum, and risk.</text>
  ${card(56, 300, 315, 160, 'Work first', ['American Board of Clinical Nutrition', 'Send the board-ready journey map.', 'Why: modernization has board urgency.'], '#a34832')}
  ${card(391, 300, 315, 160, 'Meetings', ['2 meetings need prep', 'Certification and CE launch calls.', 'Open with buyer pressure.'])}
  ${card(726, 300, 315, 160, 'Overdue', ['1 follow-up overdue', 'Audit reporting example.', 'Clear promises before new work.'], '#a34832')}
  ${card(1061, 300, 323, 160, 'Momentum / risk', ['3 / 3 accounts', 'Push champions and rescue drift.', 'Open account workspace.'])}
  <rect x="56" y="500" width="840" height="280" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="86" y="548" font-size="28" font-weight="900" fill="#20322d">Priority queue</text>
  <circle cx="104" cy="598" r="18" fill="#20322d"/><text x="99" y="604" font-size="14" font-weight="800" fill="#fff">1</text>
  <text x="136" y="594" font-size="18" font-weight="800" fill="#20322d">American Board of Clinical Nutrition</text>
  <text x="136" y="624" font-size="14" fill="#62574d">Open with board deadline, then confirm learner checkpoints.</text>
  <circle cx="104" cy="678" r="18" fill="#20322d"/><text x="99" y="684" font-size="14" font-weight="800" fill="#fff">2</text>
  <text x="136" y="674" font-size="18" font-weight="800" fill="#20322d">Association of Rural Health Educators</text>
  <text x="136" y="704" font-size="14" fill="#62574d">Ask what must be true by September for launch to feel safe.</text>
  <rect x="920" y="500" width="464" height="280" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="950" y="548" font-size="24" font-weight="900" fill="#20322d">Momentum accounts</text>
  <text x="950" y="598" font-size="16" font-weight="800" fill="#20322d">National Credit Union Learning Network</text>
  <text x="950" y="628" font-size="16" font-weight="800" fill="#20322d">American Board of Clinical Nutrition</text>
  <text x="950" y="678" font-size="24" font-weight="900" fill="#a34832">At-risk accounts</text>
  <text x="950" y="728" font-size="16" font-weight="800" fill="#20322d">Midwest Manufacturing Safety Council</text>
  <text x="56" y="855" font-size="30" font-weight="900" fill="#20322d">Meetings · Follow-ups · Triggers</text>
  ${card(56, 890, 410, 155, 'Meeting prep', ['Maya Chen', 'Compare certification learner journeys.', 'Action: send simple journey map.'])}
  ${card(516, 890, 410, 155, 'Overdue', ['Rachel Kim', 'Plant-level audit reporting.', 'Action: send reporting screenshots.'], '#a34832')}
  ${card(976, 890, 408, 155, 'Trigger', ['Dana Patel', 'New compliance learning director.', 'Action: invite them to reporting discussion.'])}`);

const dashboardMobile = shell(390, 1200, `
  <rect x="0" y="0" width="390" height="230" fill="#efe2cf" />
  <text x="20" y="42" font-size="16" font-weight="800" fill="#20322d">Sales Command Center</text>
  <text x="20" y="92" font-size="34" font-weight="900" fill="#20322d">Decide the next</text>
  <text x="20" y="130" font-size="34" font-weight="900" fill="#20322d">best sales move</text>
  ${card(20, 260, 350, 150, 'Work first', ['American Board', 'Send journey map.', 'Why: board urgency.'], '#a34832')}
  ${card(20, 430, 350, 150, 'Meetings', ['2 need prep', 'Certification and CE.', 'Ask practical next step.'])}
  ${card(20, 600, 350, 150, 'Overdue', ['1 follow-up', 'Audit reporting.', 'Clear promises.'], '#a34832')}
  <rect x="20" y="790" width="350" height="300" rx="24" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="42" y="838" font-size="24" font-weight="900" fill="#20322d">Priority queue</text>
  <text x="42" y="890" font-size="16" font-weight="800" fill="#20322d">1. American Board</text>
  <text x="42" y="920" font-size="13" fill="#62574d">Confirm learner checkpoints.</text>
  <text x="42" y="970" font-size="16" font-weight="800" fill="#20322d">2. Rural Health Educators</text>
  <text x="42" y="1000" font-size="13" fill="#62574d">Focus on CE launch risk.</text>`);

const workspace = shell(1440, 1150, `
  <text x="56" y="70" font-size="18" fill="#2f4a42">← Back to dashboard</text>
  <rect x="56" y="105" width="1328" height="210" rx="30" fill="#efe2cf" stroke="#ddcdb8" />
  <text x="86" y="158" font-size="14" font-weight="800" fill="#9a623f">ACCOUNT WORKSPACE</text>
  <text x="86" y="220" font-size="48" font-weight="900" fill="#20322d">American Board of Clinical Nutrition</text>
  <text x="86" y="260" font-size="20" fill="#526158">Credentialing · Engaged · Next touch due 2026-07-03</text>
  <rect x="1085" y="165" width="220" height="50" rx="25" fill="#2f4a42"/><text x="1130" y="198" font-size="15" font-weight="800" fill="#fff">Draft next action</text>
  ${card(56, 350, 640, 180, 'Snapshot', ['Fit 92 · Timing 88', 'Pain: prep is split across PDFs, webinars, LMS.', 'Research: contract, board timeline, retake policy.'])}
  ${card(744, 350, 640, 180, 'Do next', ['Send journey map', 'Show enrollment, practice progress, risk flags.', 'Why: gives Maya a board-ready story.'], '#a34832')}
  ${card(56, 570, 640, 180, 'Contacts', ['Maya Chen · Jon Rivera', 'Economic buyer and technical evaluator.', 'Angles: learner risk and reporting cleanup.'])}
  ${card(744, 570, 640, 180, 'Buying committee', ['Maya · Jon · Priya', 'Decision maker, evaluator, approver.', 'Cares about board value and budget clarity.'])}
  ${card(56, 790, 640, 180, 'Meeting history', ['Intro and discovery complete', 'Board story + admin effort confirmed.', 'Follow-up: learner journey map.'])}
  ${card(744, 790, 640, 180, 'Timeline', ['Research → call → discovery', 'Modernization signal became board urgency.', 'Next: send board-ready map.'])}`);


const brief = shell(1440, 1050, `
  <rect x="56" y="52" width="1328" height="120" rx="26" fill="#efe2cf" stroke="#ddcdb8" />
  <text x="86" y="102" font-size="38" font-weight="900" fill="#20322d">Pre-call brief generator</text>
  <text x="86" y="138" font-size="18" fill="#526158">Polished printable brief with snapshot, angle, questions, objections, opener, next step, and email draft.</text>
  <rect x="56" y="210" width="420" height="650" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="86" y="260" font-size="24" font-weight="900" fill="#20322d">Brief inputs</text>
  <text x="86" y="315" font-size="16" fill="#62574d">Account · Contact · Title · Vertical</text>
  <text x="86" y="365" font-size="16" fill="#62574d">Meeting type · Competitor · Notes</text>
  <rect x="86" y="745" width="220" height="48" rx="24" fill="#2f4a42" />
  <text x="122" y="776" font-size="15" font-weight="800" fill="#fff">Generate printable brief</text>
  <rect x="520" y="210" width="864" height="650" rx="28" fill="#fffdf8" stroke="#d9cbb8" />
  <text x="560" y="265" font-size="14" font-weight="800" fill="#9a623f">PRE-CALL BRIEF</text>
  <text x="560" y="320" font-size="36" font-weight="900" fill="#20322d">American Board of Clinical Nutrition</text>
  <text x="560" y="365" font-size="20" fill="#526158">Maya Chen · Discovery follow-up</text>
  <text x="560" y="430" font-size="22" font-weight="900" fill="#20322d">Account Snapshot</text>
  <text x="560" y="462" font-size="15" fill="#62574d">Credentialing account modernizing certification prep before a board decision.</text>
  <text x="560" y="530" font-size="22" font-weight="900" fill="#20322d">Three Value Angles</text>
  <text x="590" y="570" font-size="15" fill="#62574d">• Show learner progress early enough to act.</text>
  <text x="590" y="604" font-size="15" fill="#62574d">• Give program owners cleaner reporting.</text>
  <text x="590" y="638" font-size="15" fill="#62574d">• Reduce manual reminders and proof work.</text>
  <text x="560" y="710" font-size="22" font-weight="900" fill="#20322d">Follow-up Email Draft</text>
  <text x="560" y="744" font-size="15" fill="#62574d">Warm recap with practical next step and low-pressure checklist option.</text>`);

const emailReview = shell(1440, 980, `
  <text x="56" y="82" font-size="42" font-weight="900" fill="#20322d">Email review tool</text>
  <text x="56" y="122" font-size="20" fill="#526158">Side-by-side comparison with flagged corporate and salesy language.</text>
  <rect x="56" y="170" width="640" height="700" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="86" y="225" font-size="28" font-weight="900" fill="#20322d">Original email</text>
  <text x="86" y="280" font-size="16" fill="#62574d">Flagged: salesy opener, broad claims, weak personalization.</text>
  <text x="86" y="370" font-size="22" font-weight="900" fill="#20322d">Corporate phrases</text>
  <text x="110" y="410" font-size="15" fill="#a34832">• leverage • robust • best-in-class</text>
  <text x="86" y="485" font-size="22" font-weight="900" fill="#20322d">Missed personalization</text>
  <text x="110" y="525" font-size="15" fill="#62574d">• Add program, deadline, or buyer role detail.</text>
  <rect x="744" y="170" width="640" height="700" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="774" y="225" font-size="28" font-weight="900" fill="#20322d">Pat's voice</text>
  <text x="774" y="285" font-size="18" font-weight="800" fill="#20322d">Better opener</text>
  <text x="774" y="320" font-size="15" fill="#62574d">Thanks for the context. The part that stood out is the pressure to make learning easier to prove.</text>
  <text x="774" y="400" font-size="18" font-weight="800" fill="#20322d">Better CTA</text>
  <text x="774" y="435" font-size="15" fill="#62574d">Would it be useful to spend 25 minutes mapping the current process?</text>
  <rect x="774" y="505" width="270" height="250" rx="18" fill="#f5ebdc" />
  <text x="804" y="548" font-size="16" font-weight="800" fill="#2f5c4f">Before</text>
  <text x="804" y="592" font-size="14" fill="#62574d">Generic check-in with pressure.</text>
  <rect x="1074" y="505" width="270" height="250" rx="18" fill="#f5ebdc" />
  <text x="1104" y="548" font-size="16" font-weight="800" fill="#2f5c4f">After</text>
  <text x="1104" y="592" font-size="14" fill="#62574d">Specific, warm, and low-pressure.</text>`);

const prospects = shell(1440, 1050, `
  <text x="56" y="82" font-size="42" font-weight="900" fill="#20322d">Prospect workspace</text>
  <text x="56" y="122" font-size="20" fill="#526158">CSV upload scores accounts, identifies ICP fit, groups contacts, and creates action boards.</text>
  <rect x="56" y="170" width="420" height="760" rx="26" fill="#fffaf1" stroke="#e2d4c1" />
  <text x="86" y="225" font-size="26" font-weight="900" fill="#20322d">CSV input</text>
  <text x="86" y="280" font-size="15" fill="#62574d">account, contact, title, vertical, employees, signal, notes</text>
  ${card(520, 170, 864, 210, 'Strong ICP fit · Score 100', ['State Association of Workforce Boards', 'Recommended first outreach tied to member certification launch.', 'Actions: confirm event, find owner, draft note, log next touch.'])}
  ${card(520, 415, 864, 210, 'Strong ICP fit · Score 100', ['Great Lakes Hospital Education Network', 'CE tracking review with distributed educators.', 'Missing research: current learning pain details.'])}
  ${card(520, 660, 864, 210, 'Medium ICP fit · Score 72', ['Precision Trades Alliance', 'Conference training track suggests member learning need.', 'Actions: research LMS, budget timing, program owner.'])}`);

writeFileSync('docs/screenshots/dashboard-desktop.svg', dashboardDesktop);
writeFileSync('docs/screenshots/dashboard-mobile.svg', dashboardMobile);
writeFileSync('docs/screenshots/account-workspace.svg', workspace);
writeFileSync('docs/screenshots/pre-call-brief.svg', brief);
writeFileSync('docs/screenshots/email-review.svg', emailReview);
writeFileSync('docs/screenshots/prospect-workspace.svg', prospects);
console.log('Generated screenshot review assets in docs/screenshots/.');
