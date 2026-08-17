const menuBtn=document.getElementById('menuBtn');const navLinks=document.getElementById('navLinks');const progress=document.getElementById('progress');const year=document.getElementById('year');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false');menuBtn?.setAttribute('aria-label','Open navigation')}));
const updateProgress=()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${h>0?(window.scrollY/h)*100:0}%`};
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();
if(year)year.textContent=new Date().getFullYear();
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:reduceMotion?.05:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
