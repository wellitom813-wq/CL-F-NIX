const $ = id => document.getElementById(id);
let timerHandle = null;

$("year").textContent = new Date().getFullYear();
$("menuBtn").onclick = () => $("menu").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a => a.onclick = () => $("menu").classList.remove("open"));
$("refreshBtn").onclick = () => loadWar(true);

const fmtPct = n => `${Number(n || 0).toFixed(1)}%`;

function cocDate(value){
  if(!value) return null;
  const m = String(value).match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/);
  if(!m) return new Date(value);
  return new Date(Date.UTC(+m[1], +m[2]-1, +m[3], +m[4], +m[5], +m[6]));
}

function startCountdown(target, label){
  clearInterval(timerHandle);
  $("timerLabel").textContent = label;
  if(!target){
    $("countdown").textContent = "--:--:--";
    return;
  }
  const tick = () => {
    let diff = Math.max(0, target.getTime() - Date.now());
    const days = Math.floor(diff / 86400000); diff %= 86400000;
    const h = Math.floor(diff / 3600000); diff %= 3600000;
    const m = Math.floor(diff / 60000); diff %= 60000;
    const s = Math.floor(diff / 1000);
    $("countdown").textContent =
      (days ? `${days}d ` : "") +
      `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  };
  tick();
  timerHandle = setInterval(tick,1000);
}

function statusFor(state){
  if(state === "inWar") return ["AO VIVO","online"];
  if(state === "preparation") return ["EM PREPARAÇÃO","prep"];
  if(state === "warEnded") return ["ENCERRADA",""];
  return ["SEM GUERRA",""];
}

function findMember(side, tag){
  return (side?.members || []).find(m => m.tag === tag);
}

function renderAttacks(d){
  const clan = d.clan || {};
  const opponent = d.opponent || {};
  const attacks = [];

  (clan.members || []).forEach(attacker => {
    (attacker.attacks || []).forEach(a => {
      const defender = findMember(opponent, a.defenderTag);
      attacks.push({
        ...a,
        attackerName: attacker.name,
        attackerTH: attacker.townhallLevel,
        defenderName: defender?.name || a.defenderTag,
        defenderTH: defender?.townhallLevel || "?"
      });
    });
  });

  attacks.sort((a,b) => (b.order || 0) - (a.order || 0));

  $("attacksList").innerHTML = attacks.length ? attacks.map(a => `
    <article class="attack-row">
      <div class="attack-order">#${a.order || "-"}</div>
      <div class="attack-player">
        <b>${escapeHtml(a.attackerName)}</b>
        <small>CV${a.attackerTH || "?"}</small>
      </div>
      <div class="attack-arrow">→</div>
      <div class="attack-defender">
        <b>${escapeHtml(a.defenderName)}</b>
        <small>CV${a.defenderTH}</small>
      </div>
      <div class="attack-result">
        <strong>${"⭐".repeat(a.stars || 0)}${"☆".repeat(Math.max(0,3-(a.stars || 0)))}</strong>
        <small>${fmtPct(a.destructionPercentage)}</small>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Nenhum ataque da Fênix registrado ainda.</div>`;
}

function renderMembers(d){
  const members = [...(d.clan?.members || [])].sort((a,b)=>(a.mapPosition||99)-(b.mapPosition||99));
  $("membersWar").innerHTML = members.map(m => {
    const attacks = m.attacks || [];
    const stars = attacks.reduce((sum,a)=>sum+(a.stars||0),0);
    const destruction = attacks.reduce((sum,a)=>sum+(a.destructionPercentage||0),0);
    return `
      <article class="war-member">
        <div class="position">#${m.mapPosition || "-"}</div>
        <div>
          <h3>${escapeHtml(m.name)}</h3>
          <p>CV${m.townhallLevel || "?"} • ${attacks.length} ataque${attacks.length===1?"":"s"}</p>
        </div>
        <div class="member-stars">
          <b>${stars} ⭐</b>
          <small>${destruction.toFixed(0)}% total</small>
        </div>
      </article>`;
  }).join("");
}

function escapeHtml(s){
  return String(s ?? "").replace(/[&<>"']/g,c=>({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
  }[c]));
}

async function loadWar(manual=false){
  if(manual){
    $("refreshBtn").disabled = true;
    $("refreshBtn").textContent = "Atualizando...";
  }

  try{
    const r = await fetch(`/api/war?t=${Date.now()}`, { cache:"no-store" });
    const d = await r.json();
    if(!r.ok) throw new Error(d.message || "Falha ao consultar guerra");

    const [status, dotClass] = statusFor(d.state);
    $("warStatus").textContent = status;
    $("liveDot").className = `live-dot ${dotClass}`;
    $("lastUpdate").textContent = `Atualizado às ${new Date().toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}`;

    if(d.state === "notInWar"){
      document.querySelector(".war-scoreboard").hidden = true;
      document.querySelector(".war-stats").hidden = true;
      document.querySelectorAll(".war-section").forEach(x=>x.hidden=true);
      $("noWar").hidden = false;
      return;
    }

    $("noWar").hidden = true;
    document.querySelector(".war-scoreboard").hidden = false;
    document.querySelector(".war-stats").hidden = false;
    document.querySelectorAll(".war-section").forEach(x=>x.hidden=false);

    const c = d.clan || {}, o = d.opponent || {};
    const size = d.teamSize || c.members?.length || 0;
    const perMember = d.attacksPerMember || 2;
    const maxAttacks = size * perMember;
    const used = c.attacks ?? (c.members || []).reduce((n,m)=>n+(m.attacks?.length||0),0);
    const oppUsed = o.attacks ?? (o.members || []).reduce((n,m)=>n+(m.attacks?.length||0),0);

    $("clanName").textContent = c.name || "FÊNIX";
    $("opponentName").textContent = o.name || "ADVERSÁRIO";
    $("clanBadge").src = c.badgeUrls?.large || c.badgeUrls?.medium || "";
    $("opponentBadge").src = o.badgeUrls?.large || o.badgeUrls?.medium || "";
    $("clanStars").textContent = c.stars ?? 0;
    $("opponentStars").textContent = o.stars ?? 0;
    $("clanDestruction").textContent = fmtPct(c.destructionPercentage);
    $("opponentDestruction").textContent = fmtPct(o.destructionPercentage);
    $("clanAttacks").textContent = `${used} / ${maxAttacks}`;
    $("opponentAttacks").textContent = `${oppUsed} / ${maxAttacks}`;
    $("usedAttacks").textContent = `${used}/${maxAttacks}`;
    $("remainingAttacks").textContent = `${Math.max(0,maxAttacks-used)} restantes`;
    $("starsSummary").textContent = `${c.stars ?? 0} - ${o.stars ?? 0}`;
    $("destructionSummary").textContent = fmtPct(c.destructionPercentage);
    $("attacksPerMember").textContent = perMember;
    $("teamSize").textContent = `${size} x ${size}`;

    if(d.state === "preparation") startCountdown(cocDate(d.startTime),"INÍCIO EM");
    else if(d.state === "inWar") startCountdown(cocDate(d.endTime),"TEMPO RESTANTE");
    else {
      clearInterval(timerHandle);
      $("timerLabel").textContent = "STATUS";
      $("countdown").textContent = "ENCERRADA";
    }

    renderAttacks(d);
    renderMembers(d);
  }catch(e){
    $("warStatus").textContent = "INDISPONÍVEL";
    $("liveDot").className = "live-dot";
    $("lastUpdate").textContent = e.message;
    $("attacksList").innerHTML = `<div class="empty-state">Não foi possível carregar a guerra agora.</div>`;
  }finally{
    if(manual){
      $("refreshBtn").disabled = false;
      $("refreshBtn").textContent = "↻ Atualizar";
    }
  }
}

loadWar();
setInterval(()=>loadWar(false),30000);
