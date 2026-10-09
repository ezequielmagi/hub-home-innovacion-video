const toggle=document.querySelector('.menu-toggle');const nav=document.querySelector('#navigation');
if(toggle&&nav){toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!open));nav.classList.toggle('is-open',!open)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){document.querySelectorAll('details[open]').forEach(d=>d.open=false);toggle.setAttribute('aria-expanded','false');nav.classList.remove('is-open');toggle.focus()}});
document.querySelectorAll('nav > details').forEach(d=>d.addEventListener('toggle',()=>{if(d.open)document.querySelectorAll('nav > details').forEach(other=>{if(other!==d)other.open=false})}));}
const staticPreview=new URLSearchParams(location.search).has('static');
if(staticPreview)document.documentElement.classList.add('static-preview');
if(!staticPreview&&!matchMedia('(prefers-reduced-motion: reduce)').matches&&'IntersectionObserver' in window){
document.documentElement.classList.add('motion-ready');
const hero=document.querySelector('.hero');
const heroCopy=document.querySelector('.hero-copy');
if(hero&&heroCopy){
 const heroObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){hero.classList.add('is-entering');heroObserver.disconnect()}},{threshold:.12});
 heroObserver.observe(heroCopy);
}

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:"0px 0px -48px 0px"});
document.querySelectorAll('.reveal').forEach((el,i)=>{el.style.setProperty('--reveal-delay',`${(i%3)*140}ms`);observer.observe(el)});
}
