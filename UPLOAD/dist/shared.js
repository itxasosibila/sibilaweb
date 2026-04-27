// ============================================
// SIBILA — Shared JS (shared.js)
// ============================================

// ---- Cursor (desktop) ----
(function(){
  if(!window.matchMedia('(hover:hover)').matches) return;
  const c=document.createElement('div'); c.className='cursor'; document.body.appendChild(c);
  const r=document.createElement('div'); r.className='cursor-ring'; document.body.appendChild(r);
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;c.style.cssText=`left:${mx-4}px;top:${my-4}px`;});
  (function loop(){rx+=(mx-rx-17)*.12;ry+=(my-ry-17)*.12;r.style.cssText=`left:${rx}px;top:${ry}px`;requestAnimationFrame(loop);})();
  document.querySelectorAll('a,button').forEach(el=>{
    el.addEventListener('mouseenter',()=>{c.style.transform='scale(3)';r.style.opacity='0';});
    el.addEventListener('mouseleave',()=>{c.style.transform='scale(1)';r.style.opacity='.5';});
  });
})();

// ---- Nav scroll ----
window.addEventListener('scroll',()=>{
  document.getElementById('nav')?.classList.toggle('scrolled',window.scrollY>40);
});

// ---- Hamburger ----
function toggleMenu(){
  const links=document.getElementById('navLinks');
  const btn=document.getElementById('hamburger');
  links?.classList.toggle('open');
  btn?.classList.toggle('open');
}

// ---- Scroll animations ----
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:.1});
document.querySelectorAll('.fade-up').forEach(el=>{
    if(el) obs.observe(el);
});

// ---- Cookie banner ----
(function(){
  if(localStorage.getItem('cookie_ok')) return;
  const banner=document.getElementById('cookie-banner');
  if(banner) banner.classList.remove('hidden');
})();
function acceptCookies(){
  localStorage.setItem('cookie_ok','1');
  const b=document.getElementById('cookie-banner');
  if(b){b.style.transition='opacity .4s';b.style.opacity='0';setTimeout(()=>b.remove(),400);}
}

// ---- Language toggle ----
const TRANSLATIONS = {
  es: {
    'Historia':'Historia','Mundos':'Mundos','Proyectos':'Proyectos','Hablemos':'Hablemos',
    'Experiencias':'Experiencias','Arte':'Arte','Marca':'Marca','Worlds':'Mundos',
    'Let\'s talk':'Hablemos','Story':'Historia','Projects':'Proyectos',
    'Experiences':'Experiencias','Brand':'Marca','Art':'Arte',
  },
  en: {
    'Historia':'Story','Mundos':'Worlds','Proyectos':'Projects','Hablemos':'Let\'s talk',
    'Experiencias':'Experiences','Arte':'Art','Marca':'Brand',
  }
};

let currentLang = localStorage.getItem('lang') || 'es';

function applyLang(lang){
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang==='es'?'EN':'ES';
  document.querySelectorAll('[data-es]').forEach(el=>{
    el.textContent = lang==='es' ? el.dataset.es : el.dataset.en;
  });
  // Swap content blocks
  document.querySelectorAll('[data-lang]').forEach(el=>{
    el.style.display = el.dataset.lang===lang ? '' : 'none';
  });
}

function toggleLang(){
  applyLang(currentLang==='es'?'en':'es');
}

// Apply on load
document.addEventListener('DOMContentLoaded',()=>applyLang(currentLang));
