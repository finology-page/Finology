(function(){
const D=window.SITE,s=D.settings;
const esc=t=>String(t==null?"":t).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const page=(location.pathname.split("/").pop()||"index").replace(".html","")+".html";
const num=String(s.countryCode||"").replace(/\D/g,"")+String(s.phone||"").replace(/\D/g,"").replace(/^0+/,"");
const wa="https://wa.me/"+num;
const tg=s.telegramUser?"https://t.me/"+encodeURIComponent(String(s.telegramUser).replace("@","")):"https://t.me/+"+num;
const NAV=[["index.html","Home"],["index.html#services","Services"],["exclusive.html","Exclusive content"],["index.html#help","Help"],["notes.html","Notes"]];
const defs='<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs><linearGradient id="g1" gradientUnits="userSpaceOnUse" x1="358" y1="578" x2="906" y2="347"><stop offset="0" stop-color="#ff4500"/><stop offset=".55" stop-color="#ff9500"/><stop offset="1" stop-color="#ffe600"/></linearGradient><linearGradient id="g2" gradientUnits="userSpaceOnUse" x1="400" y1="600" x2="790" y2="560"><stop offset="0" stop-color="#ff0a3c"/><stop offset=".6" stop-color="#ff4d33"/><stop offset="1" stop-color="#ff9a30"/></linearGradient><linearGradient id="g3" gradientUnits="userSpaceOnUse" x1="315" y1="885" x2="537" y2="665"><stop offset="0" stop-color="#ff0a6c"/><stop offset="1" stop-color="#ff0066"/></linearGradient><symbol id="mark" viewBox="300 330 620 570"><path fill="url(#g1)" d="M358 578C365 450 440 347 570 347L906 347C860 430 800 487 715 487L540 487C460 487 395 525 358 578Z"/><path fill="url(#g2)" d="M358 670C385 580 450 524 525 524L791 526C750 600 700 656 625 656L455 638C410 635 375 645 358 670Z"/><path fill="url(#g3)" d="M315 885L343 755C360 700 400 663 460 663L537 665L495 745C460 815 400 860 315 885Z"/></symbol></defs></svg>';
const head=`<header><div class="wrap bar"><a class="brand" href="index.html" aria-label="Finology home"><svg class="logo" role="img" aria-label="Finology logo"><use href="#mark"/></svg>FINOLOGY</a><button id="menu" aria-label="Menu" aria-expanded="false">Menu</button><nav class="links" id="links">${NAV.map(([h,t])=>`<a href="${h}"${h===page?' aria-current="page"':""}>${t}</a>`).join("")}<a class="btn sm" href="#contact">Contact</a></nav></div></header>`;
const tail=`<section class="contact" id="contact"><div class="wrap"><h2>${esc(s.contactTitle)}</h2><p>${esc(s.contactText)}</p><div class="cta"><a class="btn" href="${wa}" target="_blank" rel="noopener">WhatsApp</a><a class="btn ghost" href="${tg}" target="_blank" rel="noopener">Telegram</a><a class="btn ghost" href="mailto:${esc(s.email)}">Email</a></div></div></section><footer><div class="wrap"><p>${esc(s.footerNote)}</p><div>&copy; ${new Date().getFullYear()} Finology</div></div></footer>`;
document.body.insertAdjacentHTML("afterbegin",defs+head);
document.body.insertAdjacentHTML("beforeend",tail);
document.querySelectorAll("[data-s]").forEach(e=>e.textContent=s[e.dataset.s]||"");
function card(k,d){
  const im=d.image?`<img class="pic" src="${esc(d.image)}" alt="${esc(d.title)}" loading="lazy">`:"";
  if(k==="help")return `<details class="faq"><summary>${esc(d.q)}</summary><p>${esc(d.a)}</p></details>`;
  if(k==="notes")return `<article class="note"><time>${esc(d.date)}</time><div><h3>${esc(d.title)}</h3><p>${esc(d.desc)}</p>${im}${d.tag?`<span class="tag">${esc(d.tag)}</span>`:""}</div></article>`;
  if(k==="services")return `<article class="svc"><div><h3>${esc(d.title)}</h3><p>${esc(d.desc)}</p></div>${d.price?`<span class="tag">${esc(d.price)}</span>`:""}</article>`;
  const l=d.link&&/^(https?:|mailto:)/i.test(d.link)?`<a class="more" href="${esc(d.link)}" target="_blank" rel="noopener">Open</a>`:"";
  return `<article class="tile">${im}${d.tag?`<span class="tag">${esc(d.tag)}</span>`:""}<h3>${esc(d.title)}</h3><p>${esc(d.desc)}</p>${l}</article>`;
}
document.querySelectorAll("[data-list]").forEach(el=>{const k=el.dataset.list;el.innerHTML=(D[k]||[]).map(d=>card(k,d)).join("")||'<p class="empty">Nothing here yet. Check back soon.</p>'});
const links=document.getElementById("links"),menu=document.getElementById("menu");
menu.onclick=()=>menu.setAttribute("aria-expanded",links.classList.toggle("open"));
links.addEventListener("click",e=>{if(e.target.closest("a")){links.classList.remove("open");menu.setAttribute("aria-expanded","false")}});
})();
