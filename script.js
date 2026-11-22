const menuToggle=document.querySelector(".menu-toggle");
const mainNav=document.querySelector(".main-nav");
if(menuToggle&&mainNav){
 menuToggle.addEventListener("click",()=>{
  const open=mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open?"Tutup navigasi":"Buka navigasi");
 });
 mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");
 }));
}
const current=(location.pathname.split("/").pop()||"index.html").toLowerCase();
document.querySelectorAll(".nav-link").forEach(a=>{
 const target=(a.getAttribute("href")||"").toLowerCase();
 a.classList.toggle("active",target===current);
});
const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();
const header=document.querySelector(".site-header");
if(header){
 const update=()=>header.classList.toggle("scrolled",window.scrollY>12);
 update();window.addEventListener("scroll",update,{passive:true});
}
if("IntersectionObserver"in window&&!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 document.documentElement.classList.add("motion-ready");
 const cards=document.querySelectorAll(".simple-info-card,.home-links a,.home-portrait-card,.contact-page-panel");
 const reveal=new IntersectionObserver((entries,observer)=>entries.forEach(entry=>{
  if(!entry.isIntersecting)return;
  entry.target.classList.add("is-visible");observer.unobserve(entry.target);
 }),{threshold:.12,rootMargin:"0px 0px -25px 0px"});
 cards.forEach(card=>reveal.observe(card));
}