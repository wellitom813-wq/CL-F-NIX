const CONFIG={whatsapp:"https://wa.me/5521967494580",fallback:[
{name:"Welliton",role:"Líder",townHallLevel:18,trophies:5624,donations:8430,donationsReceived:720,clanRank:1},
{name:"Fênix War",role:"Co-líder",townHallLevel:18,trophies:5410,donations:7350,donationsReceived:940,clanRank:2},
{name:"Destroyer",role:"Co-líder",townHallLevel:17,trophies:5188,donations:6210,donationsReceived:680,clanRank:3},
{name:"PhoenixBR",role:"Ancião",townHallLevel:17,trophies:4972,donations:5840,donationsReceived:530,clanRank:4}
]};
let members=[...CONFIG.fallback];

const $=id=>document.getElementById(id);
const fmt=n=>Number(n||0).toLocaleString("pt-BR");
const roles={leader:"Líder",coLeader:"Co-líder",admin:"Ancião",member:"Membro"};

$("year").textContent=new Date().getFullYear();
$("joinBtn").href=CONFIG.whatsapp;
$("menuBtn").onclick=()=>$("menu").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>$("menu").classList.remove("open"));

function status(type,text){$("apiStatus").className="api-status "+type;$("apiStatus").querySelector("b").textContent=text}
function memberCard(m){return `<article class="card member">
<div class="member-top"><div class="avatar">🔥</div><span class="role">${roles[m.role]||m.role||"Membro"}</span></div>
<h3>${escapeHtml(m.name)}</h3><p>CV${m.townHallLevel||"?"} • #${m.clanRank||"-"} no clã</p>
<div class="member-stats"><div><small>TROFÉUS</small><b>🏆 ${fmt(m.trophies)}</b></div><div><small>DOAÇÕES</small><b>🎁 ${fmt(m.donations)}</b></div><div><small>RECEBIDAS</small><b>📦 ${fmt(m.donationsReceived)}</b></div><div><small>LIGA</small><b>${escapeHtml(m.league?.name||"—")}</b></div></div></article>`}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderMembers(list=members){$("members").innerHTML=list.map(memberCard).join("")}
function rank(id,key,suffix=""){const a=[...members].sort((x,y)=>(y[key]||0)-(x[key]||0)).slice(0,8);$(id).innerHTML=a.map((m,i)=>`<div class="rank-row"><b>${i+1}º</b><span>${escapeHtml(m.name)}</span><b>${fmt(m[key])}${suffix}</b></div>`).join("")}
function renderRanks(){rank("rankTrophies","trophies");rank("rankDonations","donations");rank("rankReceived","donationsReceived")}
$("memberSearch").addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim();renderMembers(members.filter(m=>m.name.toLowerCase().includes(q)))});

async function loadClan(){
 try{
   const r=await fetch("/api/clan",{cache:"no-store"});
   const d=await r.json();
   if(!r.ok) throw new Error(d.message||"Falha na API");
   $("clanName").textContent=d.name||"Clã Fênix";
   $("heroDesc").textContent=d.description||"Site oficial do Clã Fênix.";
   $("level").textContent=d.clanLevel??"--"; $("qLevel").textContent=d.clanLevel??"--";
   $("memberCount").textContent=`${d.members??0}/50`; $("qMembers").textContent=`${d.members??0}/50`;
   $("clanPoints").textContent=fmt(d.clanPoints); $("qPoints").textContent=fmt(d.clanPoints);
   $("warWins").textContent=fmt(d.warWins);
   $("clanTag").textContent=d.tag||"#VJ8GGLR8";
   $("warLeague").textContent=d.warLeague?.name||"—";
   $("location").textContent=d.location?.name||"—";
   $("requiredTrophies").textContent=fmt(d.requiredTrophies);
   members=(d.memberList||[]).length?d.memberList:members;
   renderMembers();renderRanks();
   status("ok","Dados reais carregados da API oficial");
 }catch(e){
   renderMembers();renderRanks();
   status("error","Modo demonstração — configure a API para ativar dados reais");
 }
}
async function loadWar(){
 try{
   const r=await fetch("/api/war",{cache:"no-store"});const d=await r.json();
   if(!r.ok) throw new Error(d.message||"Falha");
   if(d.state==="notInWar"){
     $("warLive").textContent="SEM GUERRA";$("warState").textContent="O clã não está em guerra neste momento";return;
   }
   const c=d.clan||{},o=d.opponent||{};
   $("warClanName").textContent=c.name||"FÊNIX";$("oppName").textContent=o.name||"ADVERSÁRIO";
   $("clanStars").textContent=c.stars??0;$("oppStars").textContent=o.stars??0;
   $("clanDestruction").textContent=`${Number(c.destructionPercentage||0).toFixed(1)}% destruição`;
   $("oppDestruction").textContent=`${Number(o.destructionPercentage||0).toFixed(1)}% destruição`;
   $("clanAttacks").textContent=`${c.attacks??0}`;$("warStarsSmall").textContent=`${c.stars??0} ⭐`;
   $("warDestructionSmall").textContent=`${Number(c.destructionPercentage||0).toFixed(1)}%`;
   const total=(c.stars||0)+(o.stars||0);$("warProgress").style.width= total?`${Math.max(8,Math.min(92,(c.stars||0)/total*100))}%`:"50%";
   $("warLive").textContent=d.state==="inWar"?"AO VIVO":String(d.state||"GUERRA").toUpperCase();
   $("warState").textContent=d.state==="preparation"?"Em preparação":d.state==="inWar"?"Guerra em andamento":"Resultado da guerra";
 }catch(e){$("warLive").textContent="INDISPONÍVEL";$("warState").textContent="Configure a API para ver a guerra atual"}
}
renderMembers();renderRanks();loadClan();loadWar();
