
const CONFIG = {
  whatsapp: "https://wa.me/5521967494580",
  membros: [
    {nome:"Welliton", cargo:"Líder", cv:"CV18", trofeus:5624, doacoes:8430, estrelas:184},
    {nome:"Fênix War", cargo:"Co-líder", cv:"CV18", trofeus:5410, doacoes:7350, estrelas:176},
    {nome:"Destroyer", cargo:"Co-líder", cv:"CV17", trofeus:5188, doacoes:6210, estrelas:165},
    {nome:"PhoenixBR", cargo:"Ancião", cv:"CV17", trofeus:4972, doacoes:5840, estrelas:151}
  ]
};

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("joinBtn").href = CONFIG.whatsapp;

const menu = document.getElementById("menu");
document.getElementById("menuBtn").addEventListener("click", () => menu.classList.toggle("open"));
document.querySelectorAll("nav a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

function memberCard(m) {
  return `
    <article class="card member">
      <div class="member-head">
        <div class="avatar">🔥</div>
        <span class="role">${m.cargo}</span>
      </div>
      <h3>${m.nome}</h3>
      <p>${m.cv}</p>
      <div class="member-stats">
        <div><small>Troféus</small><b>🏆 ${m.trofeus.toLocaleString("pt-BR")}</b></div>
        <div><small>Doações</small><b>🎁 ${m.doacoes.toLocaleString("pt-BR")}</b></div>
        <div><small>Estrelas</small><b>⭐ ${m.estrelas}</b></div>
        <div><small>Status</small><b>🟢 Ativo</b></div>
      </div>
    </article>`;
}

document.getElementById("members").innerHTML = CONFIG.membros.map(memberCard).join("");

function renderRank(id, key, suffix="") {
  const sorted = [...CONFIG.membros].sort((a,b)=>b[key]-a[key]);
  document.getElementById(id).innerHTML = sorted.map((m,i)=>`
    <div class="rank-row">
      <b>${i+1}º</b>
      <span>${m.nome}</span>
      <b>${m[key].toLocaleString("pt-BR")}${suffix}</b>
    </div>
  `).join("");
}
renderRank("rankTrophies","trofeus");
renderRank("rankDonations","doacoes");
renderRank("rankStars","estrelas"," ⭐");
