(function(){
'use strict';
const $ = (s, r=document) => r.querySelector(s);
const fmtUSD = n => '$' + Math.round(n).toLocaleString('en-US');
const fmtH = h => h >= 1 ? (h % 1 ? h.toFixed(1) : h) + (h === 1 ? ' hour' : ' hours') : Math.round(h*60) + ' min';

/* ---------- Quote journey ---------- */
const journey = {
  paper: {
    steps: [
      {w:'Request arrives by email or phone and is written down', who:'Front desk', h:4},
      {w:'Rep checks binders and asks the shop about wood, finish and lead time', who:'Sales and workshop', h:10},
      {w:'Price built by hand in a spreadsheet, then approved', who:'Sales manager', h:8},
      {w:'Quote sent as a PDF; follow-up depends on memory', who:'Sales rep', h:24}
    ],
    total:'46 hours', sub:'until the customer sees a price',
    note:'By then the customer has usually asked two competitors.'
  },
  ai: {
    steps: [
      {w:'Request read automatically; customer and product matched', who:'Assistant', h:.03},
      {w:'Draft quote from the catalog, price rules and live lead times', who:'Assistant', h:.08},
      {w:'Rep checks the draft, adjusts the details, approves', who:'Sales rep', h:.4},
      {w:'Quote sent; follow-up scheduled automatically', who:'Assistant', h:.02}
    ],
    total:'About 35 minutes', sub:'until the customer sees a price',
    note:'A person still approves every quote. The waiting is what goes away.'
  }
};
function renderJourney(mode){
  const d = journey[mode], max = Math.max(...journey.paper.steps.map(s=>s.h));
  $('#jSteps').innerHTML = d.steps.map(s => {
    const pct = Math.max(3, Math.sqrt(s.h/max)*100);
    return `<li><span class="what">${s.w}<span class="who">${s.who}</span></span><span class="track"><span class="fill" style="width:${pct}%"></span></span><span class="dur">${fmtH(s.h)}</span></li>`;
  }).join('');
  $('#jTotal').textContent = d.total; $('#jSub').textContent = d.sub; $('#jNote').textContent = d.note;
  document.querySelectorAll('.toggle button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
}
document.querySelectorAll('.toggle button').forEach(b => b.addEventListener('click', () => renderJourney(b.dataset.mode)));
renderJourney('paper');

/* ---------- Phases ---------- */
const phases = [
  {tab:'Days 1 to 30', sub:'Listen and measure', title:'Listen and measure',
   goal:'Learn how work really flows, and write down today’s numbers before changing anything.',
   items:['Interview 15 to 20 people across every level and department, and shadow one order from request to delivery.',
          'Mark each step where time, money or customers are lost. Rank them with the impact and effort method used below.',
          'Record three baseline numbers, for example time to first quote, order error rate and days to invoice.',
          'Agree on one executive sponsor and write a one-page rule set for what data may go into which tool.',
          'Pick the first workflow together with the people who will use it.'],
   exit:'Baseline numbers are written down, and the people who will use the first pilot have chosen it.'},
  {tab:'Days 31 to 60', sub:'Pilot one workflow', title:'Pilot one workflow',
   goal:'Prove value on one real process with a small group, with a person approving every output.',
   items:['Set up the assistant for the chosen workflow with a pilot group of five to eight people.',
          'Test it first on 50 past cases and compare with what actually happened.',
          'Review results weekly with the pilot group and change the tool based on their edits and complaints.',
          'Keep the old method available in parallel. Retire its paper step only when the new one has held for three weeks.'],
   exit:'The chosen metric has beaten its baseline for three weeks in a row, and pilot users would not go back.'},
  {tab:'Days 61 to 90', sub:'Scale and train', title:'Scale and train',
   goal:'Take what worked to more teams, and make the skills stay in the company.',
   items:['Add a second and third workflow, each owned by the department lead whose team uses it.',
          'Run hands-on 60-minute sessions on people’s own work, not slide decks, and hold weekly office hours.',
          'Name a champion in each department and form the monthly AI council.',
          'Publish a short scorecard to the whole company so progress is visible and concerns are heard.'],
   exit:'Half of the target team uses the tools every week without being reminded.'},
  {tab:'Day 90 onward', sub:'Make it normal', title:'Make it normal',
   goal:'Turn a project into how the company works.',
   items:['Review the scorecard monthly and retire tools and steps that no longer earn their place.',
          'Keep a quarterly roadmap of the next three workflows, ranked by impact and effort.',
          'Re-run accuracy tests whenever a model, prompt or data source changes.',
          'Share tested prompts and checks across teams so each new workflow starts ahead.'],
   exit:'The next workflow is chosen and started by the company’s own people.'}
];
const tabsEl = $('#phaseTabs'), panel = $('#phasePanel');
let cur = 0;
function showPhase(i, focus){
  cur = i;
  [...tabsEl.children].forEach((b,j)=>{b.setAttribute('aria-selected', String(j===i)); b.tabIndex = j===i?0:-1;});
  const p = phases[i];
  panel.setAttribute('aria-labelledby','tab'+i);
  panel.innerHTML = `<h3>${p.title}</h3><p class="goal">${p.goal}</p><ul>${p.items.map(x=>`<li>${x}</li>`).join('')}</ul><p class="exit"><strong>Ready to move on when</strong>${p.exit}</p>`;
  if(focus) tabsEl.children[i].focus();
}
phases.forEach((p,i)=>{
  const b = document.createElement('button');
  b.type='button'; b.role='tab'; b.id='tab'+i;
  b.innerHTML = `${p.tab}<small>${p.sub}</small>`;
  b.addEventListener('click',()=>showPhase(i));
  b.addEventListener('keydown',e=>{
    if(e.key==='ArrowRight') {e.preventDefault(); showPhase((cur+1)%phases.length,true);}
    if(e.key==='ArrowLeft') {e.preventDefault(); showPhase((cur+phases.length-1)%phases.length,true);}
  });
  tabsEl.appendChild(b);
});
showPhase(0);

/* ---------- Use cases ---------- */
const industries = {
 'Furniture maker': [
  {n:'Quote assistant', d:'Reads inquiries, drafts quotes from the catalog, price rules and live lead times.', i:5, e:2, f:'Run 50 past quotes through a draft assistant and compare with what was sent.'},
  {n:'Inquiry triage and follow-up', d:'Sorts incoming leads by value and urgency, and schedules follow-ups no one has to remember.', i:4, e:1, f:'Auto-sort the shared inbox for two weeks and count the missed replies.'},
  {n:'Order status and after-sales answers', d:'Answers where-is-my-order and care questions from order data, and hands off the rest.', i:3, e:2, f:'List the ten most common customer questions and draft answers with staff.'},
  {n:'Product content', d:'Writes descriptions, dimensions tables and dealer sheets from one source of product data.', i:3, e:1, f:'Regenerate the descriptions for the best-selling collection and have marketing review.'},
  {n:'Demand and lead-time forecasting', d:'Uses order history and seasonality to plan stock, wood and production slots.', i:4, e:4, f:'Gather three years of orders in one table and check data quality first.'}
 ],
 'Wholesale or distribution': [
  {n:'Order entry from emailed purchase orders', d:'Reads POs in any layout and drafts the order in the system for review.', i:5, e:2, f:'Collect 100 recent POs and measure how many need no edits.'},
  {n:'Collections reminders', d:'Drafts polite, specific payment reminders from aging reports.', i:4, e:1, f:'Pick the ten oldest invoices and compare AI drafts with current emails.'},
  {n:'Reorder and stock-out alerts', d:'Flags items likely to run out before the next delivery.', i:4, e:3, f:'Back-test against last year’s stock-outs.'},
  {n:'Customer-specific price answers', d:'Answers rep questions about contract prices and terms in plain language.', i:3, e:2, f:'Load the top 20 contracts and ask reps to test it with real questions.'}
 ],
 'Professional services': [
  {n:'Proposal drafting from past wins', d:'Builds a first draft from similar past proposals and the client brief.', i:5, e:2, f:'Choose five past proposals and see how close the draft gets.'},
  {n:'Meeting notes to CRM and tasks', d:'Turns calls into summaries, next steps and CRM updates.', i:4, e:1, f:'Pilot with one team for two weeks and count tasks that would have been lost.'},
  {n:'Time and billing reconciliation', d:'Finds missing or inconsistent time entries before invoicing.', i:4, e:2, f:'Run on last month’s timesheets and measure recovered billable hours.'},
  {n:'Search across past projects', d:'Lets staff ask questions of previous work, with sources shown.', i:3, e:3, f:'Index one practice area and test with ten real questions.'}
 ],
 'Light manufacturing': [
  {n:'Quote from drawings and specs', d:'Reads requests and drawings to prepare costed quotes for review.', i:5, e:3, f:'Take 30 past quotes and see how close the cost estimate lands.'},
  {n:'Supplier follow-up', d:'Tracks open purchase orders and chases late deliveries.', i:3, e:1, f:'List all open POs older than their promised date and draft chasers.'},
  {n:'Quality image checks', d:'Flags likely defects from photos taken at inspection.', i:4, e:4, f:'Collect 500 labelled photos before choosing any tool.'},
  {n:'Maintenance notes and downtime patterns', d:'Finds repeating causes of downtime in technicians’ notes.', i:3, e:2, f:'Read a year of maintenance logs and list the top five causes.'}
 ],
 'Retail or online store': [
  {n:'Customer support replies', d:'Drafts replies from order, policy and product data for an agent to approve.', i:4, e:1, f:'Draft replies to 100 past tickets and have agents score them.'},
  {n:'Product content at scale', d:'Writes and refreshes product pages and listings consistently.', i:3, e:1, f:'Redo 20 listings and compare conversion over a month.'},
  {n:'Returns triage', d:'Sorts returns by cause and suggests fixes to sizing or descriptions.', i:4, e:2, f:'Categorise last quarter’s returns and find the top three causes.'},
  {n:'Promotion and inventory planning', d:'Suggests what to discount or restock using sales history.', i:4, e:4, f:'Check the quality of sales and stock data first.'}
 ]
};
const chipsEl = $('#chips'), ucList = $('#ucList');
const pips = (n,max=5) => `<span class="pips" aria-hidden="true">${Array.from({length:max},(_,k)=>`<i class="${k<n?'on':''}"></i>`).join('')}</span>`;
function showIndustry(name){
  [...chipsEl.children].forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.name===name)));
  const list = industries[name].slice().sort((a,b)=>(b.i-b.e)-(a.i-a.e) || b.i-a.i);
  ucList.innerHTML = list.map((u,k)=>`<li><div><h3>${u.n}${k===0?'<span class="start">Start here</span>':''}</h3><p>${u.d}</p><p class="first"><strong>First week:</strong> ${u.f}</p></div><div class="meter"><div><b>Impact</b>${pips(u.i)}<span class="sr" hidden>${u.i} of 5</span></div><div><b>Effort</b>${pips(u.e)}</div></div></li>`).join('');
}
Object.keys(industries).forEach((name,i)=>{
  const b=document.createElement('button'); b.type='button'; b.dataset.name=name; b.textContent=name;
  b.setAttribute('aria-pressed','false'); b.addEventListener('click',()=>showIndustry(name)); chipsEl.appendChild(b);
});
showIndustry('Furniture maker');

/* ---------- Calculator ---------- */
const ids = ['employees','leads','aov','close','hours','rate','margin','lift','auto','real','cost'];
const el = Object.fromEntries(ids.map(k=>[k,$('#'+k)]));
function num(k){ const v = parseFloat(el[k].value); return isFinite(v) && v>=0 ? v : 0; }
function calc(){
  const emp=num('employees'), leads=num('leads'), aov=num('aov'), close=num('close')/100,
        hrs=num('hours'), rate=num('rate'), margin=num('margin')/100,
        lift=num('lift')/100, auto=num('auto')/100, real=num('real')/100, cost=num('cost');
  $('#liftOut').textContent = el.lift.value+'%'; $('#autoOut').textContent = el.auto.value+'%'; $('#realOut').textContent = el.real.value+'%';
  const extraRev = leads*12*aov*close*lift;
  const extraProfit = extraRev*margin;
  const timeValue = emp*hrs*52*auto*real*rate;
  const total = extraProfit + timeValue;
  const net = total - cost;
  const payback = total>0 ? cost/(total/12) : Infinity;
  const mx = Math.max(extraRev, extraProfit, timeValue, 1);
  const bar = (label,val,cls)=>`<div class="bar"><span>${label}</span><span class="t"><span class="f ${cls}" style="width:${Math.max(1,val/mx*100)}%"></span></span><span class="v">${fmtUSD(val)}</span></div>`;
  $('#bars').innerHTML = bar('Extra revenue',extraRev,'') + bar('Profit on it',extraProfit,'b') + bar('Time put to use',timeValue,'c');
  $('#rTotal').textContent = fmtUSD(total);
  $('#rNet').textContent = (net<0?'-':'') + fmtUSD(Math.abs(net));
  $('#rPay').textContent = isFinite(payback) ? (payback<1?'under 1 month':payback.toFixed(1)+' months') : 'not reached';
}
ids.forEach(k=>el[k].addEventListener('input',calc));
calc();
})();
