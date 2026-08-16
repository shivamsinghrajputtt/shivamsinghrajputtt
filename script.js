const menuBtn=document.getElementById('menuBtn');const navLinks=document.getElementById('navLinks');const progress=document.getElementById('progress');const year=document.getElementById('year');
menuBtn?.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));menuBtn.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
navLinks?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navLinks.classList.remove('open');menuBtn?.setAttribute('aria-expanded','false')}));
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=`${h>0?(window.scrollY/h)*100:0}%`},{passive:true});
year.textContent=new Date().getFullYear();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
