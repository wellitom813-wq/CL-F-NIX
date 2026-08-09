const $=id=>document.getElementById(id);
const state={layouts:[],cv:"all",type:"all",query:"",sort:"featured"};
$("year").textContent=new Date().getFullYear();
$("menuBtn").onclick=()=>$("menu").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>$("menu").classList.remove("open"));
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const norm=v=>String(v??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim();
function toast(m){const e=$("toast");e.textContent=m;e.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove("show"),1800)}
const valid=l=>/^https?:\/\//i.test(l||"");
function filtered(){
  const q=norm(state.query);
  let d=state.layouts.filter(x=>{
    const cv=state.cv==="all"||String(x.cv)===state.cv;
    const ty=state.type==="all"||x.tipo===state.type;
    const hay=norm([x.nome,x.tipo,`cv${x.cv}`,...(x.tags||[])].join(" "));
    return cv&&ty&&(!q||hay.includes(q));
  });
  d.sort((a,b)=>{
    if(state.sort==="featured")return Number(!!b.destaque)-Number(!!a.destaque)||(b.data||"").localeCompare(a.data||"");
    if(state.sort==="newest")return (b.data||"").localeCompare(a.data||"");
    if(state.sort==="cv-desc")return +b.cv-+a.cv;
    if(state.sort==="cv-asc")return +a.cv-+b.cv;
    if(state.sort==="name")return String(a.nome).localeCompare(String(b.nome),"pt-BR");
    return 0;
  });
  return d;
}
function icon(t){return {"Guerra":"⚔️","Anti-3":"🛡️","Troféus":"🏆","Farm":"🌾"}[t]||"🏰"}
function render(){
  const d=filtered();
  $("resultsCount").textContent=`${d.length} layout${d.length===1?"":"s"} encontrado${d.length===1?"":"s"}`;
  $("emptyState").hidden=d.length>0;
  $("layoutsGrid").innerHTML=d.map(x=>{
    const ok=valid(x.link);
    const img=x.imagem?`<img src="${esc(x.imagem)}" alt="${esc(x.nome)}" loading="lazy" onerror="this.classList.add('broken')">`:"";
    const tags=(x.tags||[]).map(t=>`<span>${esc(t)}</span>`).join("");
    return `<article class="layout-card">
      <div class="layout-media">${img}
        <div class="layout-placeholder"><div><span>🏰</span><b>CV${x.cv} • ${esc(x.tipo)}</b></div></div>
        <div class="layout-badges"><span class="layout-cv">CV${x.cv}</span>${x.destaque?`<span class="layout-featured">🔥 DESTAQUE</span>`:""}</div>
      </div>
      <div class="layout-body">
        <span class="layout-type">${icon(x.tipo)} ${esc(x.tipo)}</span>
        <h3>${esc(x.nome)}</h3>
        <p class="layout-description">${esc(x.descricao||"Layout selecionado para a Central Fênix.")}</p>
        <div class="layout-tags">${tags}</div>
        <div class="layout-actions">
          <a class="layout-open-btn ${ok?"":"disabled"}" ${ok?`href="${esc(x.link)}" target="_blank" rel="noopener"`:""}>${ok?"🔥 Abrir no Clash":"Link em breve"}</a>
          <button class="layout-copy-btn" data-copy="${esc(x.link||"")}">🔗</button>
        </div>
      </div>
    </article>`;
  }).join("");
  document.querySelectorAll(".layout-copy-btn").forEach(b=>b.onclick=async()=>{
    const l=b.dataset.copy;if(!valid(l))return toast("Este layout ainda não possui link.");
    try{await navigator.clipboard.writeText(l);toast("Link do layout copiado!")}catch{toast("Abra o layout e copie pelo navegador.")}
  });
}
function reset(){
  state.cv="all";state.type="all";state.query="";$("layoutSearch").value="";
  document.querySelectorAll("[data-cv]").forEach(b=>b.classList.toggle("active",b.dataset.cv==="all"));
  document.querySelectorAll("[data-type]").forEach(b=>b.classList.toggle("active",b.dataset.type==="all"));
  render();
}
document.querySelectorAll("[data-cv]").forEach(b=>b.onclick=()=>{state.cv=b.dataset.cv;document.querySelectorAll("[data-cv]").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
document.querySelectorAll("[data-type]").forEach(b=>b.onclick=()=>{state.type=b.dataset.type;document.querySelectorAll("[data-type]").forEach(x=>x.classList.remove("active"));b.classList.add("active");render()});
$("layoutSearch").addEventListener("input",e=>{state.query=e.target.value;render()});
$("sortSelect").addEventListener("change",e=>{state.sort=e.target.value;render()});
$("clearFilters").onclick=reset;
async function load(){
  try{
    const r=await fetch(`/layouts.json?t=${Date.now()}`,{cache:"no-store"});
    if(!r.ok)throw new Error("Não foi possível carregar layouts.json");
    const data=await r.json();state.layouts=Array.isArray(data)?data:[];
    $("totalLayouts").textContent=state.layouts.length;
    $("highlightCount").textContent=state.layouts.filter(x=>x.destaque).length;
    render();
  }catch(e){
    $("resultsCount").textContent="Erro ao carregar layouts";
    $("layoutsGrid").innerHTML=`<div class="layout-empty"><div>⚠️</div><h2>Falha ao carregar</h2><p>${esc(e.message)}</p></div>`;
  }
}
load();
