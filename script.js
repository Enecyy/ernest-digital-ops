/* ── THEME ── */
const themeBtn=document.getElementById('themeBtn');
themeBtn.addEventListener('click',()=>{
  const d=document.documentElement.getAttribute('data-theme')==='dark';
  document.documentElement.setAttribute('data-theme',d?'':'dark');
  themeBtn.textContent=d?'🌙':'☀️';
});

/* ── MOBILE MENU ── */
const hamBtn=document.getElementById('hamBtn');
const mobNav=document.getElementById('mobNav');
hamBtn.addEventListener('click',()=>{const o=mobNav.classList.toggle('open');hamBtn.textContent=o?'✕':'☰';});
function closeMenu(){mobNav.classList.remove('open');hamBtn.textContent='☰';}

/* ── TABS ── */
function showTab(name,btn){
  document.querySelectorAll('.mf').forEach(f=>f.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+name).classList.add('active');
  btn.classList.add('active');
}

/* ── SCROLL FADE ── */
const obs=new IntersectionObserver(e=>{e.forEach(x=>{if(x.isIntersecting)x.target.classList.add('vis');});},{threshold:0.07});
document.querySelectorAll('.fi').forEach(el=>obs.observe(el));

/* ── MODAL CORE ── */
function openOverlay(id){
  const ov=document.getElementById(id);
  ov.classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(id){
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow='';
}
function overlayClick(e,id){if(e.target===document.getElementById(id))closeModal(id);}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){['serviceModal','auditModal','projectModal'].forEach(id=>{const ov=document.getElementById(id);if(ov.classList.contains('open'))closeModal(id);});}});

/* ── SERVICE MODAL ── */
function openModal(pkg,subtitle,_key){
  document.getElementById('mPill').textContent=pkg;
  document.getElementById('mTitle').textContent='Request: '+pkg;
  document.getElementById('mSubtitle').textContent=subtitle;
  document.getElementById('mService').value=pkg;
  document.getElementById('mForm').style.display='flex';
  document.getElementById('mOk').style.display='none';
  openOverlay('serviceModal');
}

/* ── AUDIT MODAL ── */
function openAudit(){
  document.getElementById('aForm').style.display='flex';
  document.getElementById('aOk').style.display='none';
  openOverlay('auditModal');
}

/* ── PROJECT MODAL ── */
const PROJECTS={
  ecom:{
    tag:'E-commerce · Dropshipping',title:'Jumia product store — Lagos',
    img:'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=70',
    tags:['Inventory management','Excel dashboards','Order fulfilment','Customer support','Product listings'],
    body:`<p>I set up and operated a multi-category dropshipping store on Jumia Nigeria. The project covered end-to-end operations: sourcing products, writing listings, managing stock levels, handling customer queries, and processing orders daily.</p><p>I built Excel dashboards to track inventory turnover, profit margins per SKU, and monthly revenue — giving a clear picture of what was working and what to cut.</p><p>This experience is directly transferable to any retail or product-based business that needs operational support without hiring a full-time staff member.</p>`,
    pkg:'E-commerce + Inventory Ops',pkgKey:'ecom'
  },
  web:{
    tag:'Web build · Automation',title:'Service business landing page + booking',
    img:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=700&q=70',
    tags:['HTML/CSS/JS','Google Calendar','Email automation','Mobile-responsive','Contact form'],
    body:`<p>Built a one-page website for a service business from scratch in HTML, CSS, and JavaScript. The brief was simple: look professional, load fast on mobile, and make it easy to book.</p><p>I integrated Google Calendar so the booking button opens real-time availability — the owner gets automatic calendar invites and the client gets a confirmation email with all the details.</p><p>The site went live in 6 days. The owner reported their first online booking within 48 hours of launch.</p>`,
    pkg:'Digital Starter Pack',pkgKey:'starter'
  },
  social:{
    tag:'Social media · Content',title:'Social media account management',
    img:'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=700&q=70',
    tags:['Content calendar','Canva graphics','Instagram','Facebook','Community management'],
    body:`<p>Managed the full social media presence across Instagram and Facebook. Responsibilities included writing post copy, designing graphics in Canva, scheduling 3–4 posts per week, and responding to comments and DMs.</p><p>I built a recurring content calendar so posting was predictable and the business owner never had to think about what to post next. Monthly reports tracked follower growth, reach, and which content drove the most enquiries.</p><p>Over 90 days, the account went from inconsistent posting to a steady rhythm that became a genuine source of inbound leads.</p>`,
    pkg:'Social Media Management',pkgKey:'social'
  },
  crm:{
    tag:'CRM · Admin · Automation',title:'CRM setup + onboarding automation',
    img:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=70',
    tags:['HubSpot','Automated sequences','Google Calendar','Pipeline setup','Weekly reporting'],
    body:`<p>Configured HubSpot from scratch for a service business with no existing CRM. The setup included a contact pipeline with custom stages, automated welcome emails triggered on form submission, appointment reminders sent 24 hours before a booking, and a follow-up sequence that ran automatically after a consultation.</p><p>I also built a weekly Excel dashboard that pulled key numbers — new leads, conversion rate, bookings, and outstanding follow-ups — so the owner could review everything in one five-minute check each Monday.</p><p>The owner estimated it saved 8–10 hours of admin per week in the first month alone.</p>`,
    pkg:'CRM + Admin Setup',pkgKey:'crm'
  }
};
function openProject(key){
  const p=PROJECTS[key];
  document.getElementById('pTag').textContent=p.tag;
  document.getElementById('pTitle').textContent=p.title;
  const tags=p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('');
  document.getElementById('pBody').innerHTML=`
    <img class="proj-img" src="${p.img}" alt="${p.title}" loading="lazy"/>
    <div class="proj-tags">${tags}</div>
    <div class="proj-detail">${p.body}</div>
    <button class="proj-cta" onclick="closeModal('projectModal');openModal('${p.pkg}','See case study above','${p.pkgKey}')">Request something similar →</button>`;
  openOverlay('projectModal');
}

/* ── VALIDATION ── */
const ERX=/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function vField(id,errId,test){
  const el=document.getElementById(id),er=document.getElementById(errId);
  const bad=!test(el.value);
  el.classList.toggle('err',bad);
  if(er)er.classList.toggle('show',bad);
  return bad;
}
function clearErr(id,errId){
  const el=document.getElementById(id),er=document.getElementById(errId);
  if(el)el.classList.remove('err');
  if(er)er.classList.remove('show');
}

/* main contact form */
document.getElementById('cForm').addEventListener('submit',function(e){
  e.preventDefault();
  let fail=false;
  if(vField('fn','e-fn',v=>v.trim()))fail=false||fail;else fail=true;
  if(vField('fn','e-fn',v=>v.trim().length>0)){fail=fail;}else{fail=true;}
  const fA=[
    ['fn','e-fn',v=>v.trim().length>0],
    ['fe','e-fe',v=>ERX.test(v.trim())],
    ['fs','e-fs',v=>v!==''],
    ['fm','e-fm',v=>v.trim().length>=10]
  ];
  fail=false;
  fA.forEach(([id,eid,test])=>{if(vField(id,eid,test)){}else{fail=true;}});
  // redo cleanly
  fail=false;
  fA.forEach(([id,eid,test])=>{const bad=!test(document.getElementById(id).value);document.getElementById(id).classList.toggle('err',bad);const er=document.getElementById(eid);if(er)er.classList.toggle('show',bad);if(bad)fail=true;});
  if(fail)return;
  this.style.display='none';
  document.getElementById('fok').style.display='block';
});
[['fn','e-fn'],['fe','e-fe'],['fs','e-fs'],['fm','e-fm']].forEach(([id,eid])=>{
  const el=document.getElementById(id);
  if(el)el.addEventListener('input',()=>clearErr(id,eid));
});

/* service modal form */
document.getElementById('mForm').addEventListener('submit',function(e){
  e.preventDefault();
  let fail=false;
  const checks=[
    ['mName','me-mName',v=>v.trim().length>0],
    ['mEmail','me-mEmail',v=>ERX.test(v.trim())],
    ['mMsg','me-mMsg',v=>v.trim().length>=10]
  ];
  checks.forEach(([id,eid,test])=>{const bad=!test(document.getElementById(id).value);document.getElementById(id).classList.toggle('err',bad);const er=document.getElementById(eid);if(er)er.classList.toggle('show',bad);if(bad)fail=true;});
  if(fail)return;
  this.style.display='none';
  document.getElementById('mOk').style.display='block';
});
[['mName','me-mName'],['mEmail','me-mEmail'],['mMsg','me-mMsg']].forEach(([id,eid])=>{
  const el=document.getElementById(id);
  if(el)el.addEventListener('input',()=>clearErr(id,eid));
});

/* audit form */
document.getElementById('aForm').addEventListener('submit',function(e){
  e.preventDefault();
  let fail=false;
  const checks=[
    ['aN','me-aN',v=>v.trim().length>0],
    ['aE','me-aE',v=>ERX.test(v.trim())],
    ['aBiz','me-aBiz',v=>v.trim().length>0]
  ];
  checks.forEach(([id,eid,test])=>{const bad=!test(document.getElementById(id).value);document.getElementById(id).classList.toggle('err',bad);const er=document.getElementById(eid);if(er)er.classList.toggle('show',bad);if(bad)fail=true;});
  if(fail)return;
  this.style.display='none';
  document.getElementById('aOk').style.display='block';
});
[['aN','me-aN'],['aE','me-aE'],['aBiz','me-aBiz']].forEach(([id,eid])=>{
  const el=document.getElementById(id);
  if(el)el.addEventListener('input',()=>clearErr(id,eid));
});