const CLAN_TAG = "#VJ8GGLR8";

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn?.addEventListener("click", () => {
  menu?.classList.toggle("ativo");
});

document.querySelectorAll(".menu a").forEach(link => {
  link.addEventListener("click", () => menu?.classList.remove("ativo"));
});

let membrosCarregados = [];

function textoCargo(role) {
  const mapa = {
    leader: "Líder",
    coLeader: "Colíder",
    admin: "Ancião",
    member: "Membro"
  };
  return mapa[role] || role || "Membro";
}

function setStatus(texto, tipo = "") {
  const status = document.getElementById("statusApi");
  const bolinha = document.getElementById("statusApiBolinha");

  status.textContent = texto;
  bolinha.className = "status-bolinha";

  if (tipo) bolinha.classList.add(tipo);
}

function formatarNumero(valor) {
  return Number(valor || 0).toLocaleString("pt-BR");
}

function renderRanking(membros) {
  const lista = document.getElementById("rankingLista");
  const top = [...membros]
    .sort((a, b) => (b.trophies || 0) - (a.trophies || 0))
    .slice(0, 10);

  if (!top.length) {
    lista.innerHTML = '<div class="aviso">Nenhum membro encontrado.</div>';
    return;
  }

  lista.innerHTML = top.map((m, i) => `
    <article class="ranking-item ${i === 0 ? "top1" : ""}">
      <div class="posicao">${i + 1}</div>
      <div>
        <strong>${m.name}</strong>
        <small>${textoCargo(m.role)} • CV ${m.townHallLevel || "--"}</small>
      </div>
      <div class="ranking-trofeus">🏆 ${formatarNumero(m.trophies)}</div>
    </article>
  `).join("");
}

function renderMembros(membros) {
  const grid = document.getElementById("membrosGrid");

  if (!membros.length) {
    grid.innerHTML = '<div class="aviso">Nenhum membro encontrado.</div>';
    return;
  }

  grid.innerHTML = membros.map(m => `
    <article class="membro-card">
      <div class="membro-topo">
        <div class="membro-nome">${m.name}</div>
        <span class="cargo">${textoCargo(m.role)}</span>
      </div>

      <div class="membro-dados">
        <div>
          <span>Centro de Vila</span>
          <strong>CV ${m.townHallLevel || "--"}</strong>
        </div>
        <div>
          <span>Troféus</span>
          <strong>🏆 ${formatarNumero(m.trophies)}</strong>
        </div>
        <div>
          <span>Doações</span>
          <strong>${formatarNumero(m.donations)}</strong>
        </div>
        <div>
          <span>Recebidas</span>
          <strong>${formatarNumero(m.donationsReceived)}</strong>
        </div>
      </div>
    </article>
  `).join("");
}

document.querySelectorAll(".filtro").forEach(botao => {
  botao.addEventListener("click", () => {
    document.querySelectorAll(".filtro").forEach(b => b.classList.remove("ativo"));
    botao.classList.add("ativo");

    const cargo = botao.dataset.cargo;

    if (cargo === "todos") {
      renderMembros(membrosCarregados);
      return;
    }

    renderMembros(membrosCarregados.filter(m => m.role === cargo));
  });
});

async function carregarClan() {
  try {
    const resposta = await fetch("/api/clan");

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      throw new Error(erro.message || "Falha ao consultar o clã.");
    }

    const clan = await resposta.json();

    document.getElementById("nomeTopo").textContent = clan.name || "CLÃ FÊNIX";
    document.getElementById("tagTopo").textContent = clan.tag || CLAN_TAG;
    document.getElementById("footerTag").textContent = clan.tag || CLAN_TAG;
    document.getElementById("descricaoClan").textContent =
      clan.description || "Clã Fênix • Organização, guerra e evolução.";

    document.getElementById("statMembros").textContent = clan.members ?? "--";
    document.getElementById("statNivel").textContent = clan.clanLevel ?? "--";
    document.getElementById("statPontos").textContent = formatarNumero(clan.clanPoints);
    document.getElementById("statVitorias").textContent = clan.warWins ?? "--";
    document.getElementById("statSequencia").textContent = clan.warWinStreak ?? "--";
    document.getElementById("statLiga").textContent =
      clan.warLeague?.name || clan.capitalLeague?.name || "--";

    membrosCarregados = clan.memberList || [];
    renderRanking(membrosCarregados);
    renderMembros(membrosCarregados);

    setStatus("API conectada • dados do clã atualizados", "ok");
  } catch (erro) {
    console.error(erro);
    setStatus(
      "Não foi possível carregar a API. Confira CLASH_API_TOKEN na Vercel.",
      "erro"
    );

    document.getElementById("rankingLista").innerHTML =
      '<div class="aviso">Ranking indisponível até a API ser configurada.</div>';

    document.getElementById("membrosGrid").innerHTML =
      '<div class="aviso">Membros indisponíveis até a API ser configurada.</div>';
  }
}

function formatarEstadoGuerra(estado) {
  const mapa = {
    preparation: "Preparação",
    inWar: "Em guerra",
    warEnded: "Guerra encerrada",
    notInWar: "Sem guerra"
  };
  return mapa[estado] || estado || "--";
}

async function carregarGuerra() {
  const aviso = document.getElementById("guerraSemDados");
  const card = document.getElementById("guerraCard");

  try {
    const resposta = await fetch("/api/currentwar");

    if (!resposta.ok) {
      const erro = await resposta.json().catch(() => ({}));
      throw new Error(erro.message || "Falha ao consultar a guerra.");
    }

    const guerra = await resposta.json();

    if (!guerra || guerra.state === "notInWar") {
      aviso.textContent = "O clã não está participando de uma guerra neste momento.";
      return;
    }

    const nossoClan = guerra.clan || {};
    const oponente = guerra.opponent || {};

    document.getElementById("nomeFenix").textContent = nossoClan.name || "FÊNIX";
    document.getElementById("nomeAdversario").textContent = oponente.name || "Adversário";

    document.getElementById("estrelasFenix").textContent =
      `${nossoClan.stars ?? 0} ⭐`;

    document.getElementById("estrelasRival").textContent =
      `${oponente.stars ?? 0} ⭐`;

    document.getElementById("destruicaoFenix").textContent =
      `${Number(nossoClan.destructionPercentage || 0).toFixed(1)}% destruição`;

    document.getElementById("destruicaoRival").textContent =
      `${Number(oponente.destructionPercentage || 0).toFixed(1)}% destruição`;

    document.getElementById("estadoGuerra").textContent =
      formatarEstadoGuerra(guerra.state);

    document.getElementById("tempoGuerra").textContent =
      guerra.endTime ? `Fim: ${guerra.endTime}` : "";

    if (nossoClan.badgeUrls?.medium) {
      document.getElementById("badgeFenix").src = nossoClan.badgeUrls.medium;
    }

    if (oponente.badgeUrls?.medium) {
      document.getElementById("badgeRival").src = oponente.badgeUrls.medium;
    }

    aviso.classList.add("oculto");
    card.classList.remove("oculto");
  } catch (erro) {
    console.error(erro);
    aviso.textContent =
      "Guerra atual indisponível. O registro de guerra do clã pode estar privado ou a API ainda não foi configurada.";
  }
}

carregarClan();
carregarGuerra();
