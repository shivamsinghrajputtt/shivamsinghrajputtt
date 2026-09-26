const menuBtn=document.getElementById('menuBtn');
const navLinks=document.getElementById('navLinks');
const progress=document.getElementById('progress');
const year=document.getElementById('year');
const clock=document.getElementById('clock');
const glow=document.querySelector('.cursor-glow');
const cursorLabel=document.getElementById('cursorLabel');

menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
const updateProgress=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${h>0?(window.scrollY/h)*100:0}%`};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
if(year)year.textContent=new Date().getFullYear();
const tick=()=>{if(clock)clock.textContent=new Date().toLocaleTimeString('en-IN',{hour12:false})};tick();setInterval(tick,1000);

const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduceMotion&&glow){
  window.addEventListener('pointermove',e=>{
    glow.style.left=e.clientX+'px'; glow.style.top=e.clientY+'px';
    if(cursorLabel){cursorLabel.style.left=e.clientX+'px';cursorLabel.style.top=e.clientY+'px'}
  },{passive:true});
}
if(!reduceMotion){
  document.querySelectorAll('.magnetic-card').forEach(card=>{
    card.addEventListener('pointerenter',()=>{if(cursorLabel){cursorLabel.textContent=card.dataset.cursor||'VIEW';cursorLabel.classList.add('show')}});
    card.addEventListener('pointerleave',()=>{cursorLabel?.classList.remove('show');card.style.transform=''});
    card.addEventListener('pointermove',e=>{
      const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(1100px) rotateX(${(-y*2.2).toFixed(2)}deg) rotateY(${(x*2.2).toFixed(2)}deg) translateY(-3px)`;
    });
  });
}
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:reduceMotion?.04:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
