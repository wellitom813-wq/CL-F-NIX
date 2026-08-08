/* =========================================================
   CLÃ FÊNIX - DADOS MANUAIS
   Dados preenchidos a partir das imagens enviadas.
   Foram usados apenas campos claramente identificáveis:
   nome, cargo, CV, BC, nível e posição.
========================================================= */

const DADOS_CLAN = {
  nome: "FÊNIX",
  tag: "#VJ8GGLR8",
  descricao:
    "Organização, guerra, evolução e espírito de equipe. Bem-vindo ao portal oficial do Clã Fênix.",

  // Atualize estes números quando desejar.
  membros: 49,
  nivel: "--",
  pontos: "--",
  vitorias: "--",
  sequencia: "--",
  liga: "--"
};


/* =========================================================
   GUERRA ATUAL
   Atualize manualmente quando iniciar uma nova guerra.
========================================================= */

const GUERRA_ATUAL = {
  nomeClan: "FÊNIX",
  estrelasClan: 0,
  destruicaoClan: 0,

  adversario: "Aguardando adversário",
  estrelasRival: 0,
  destruicaoRival: 0,

  estado: "Sem dados",
  tempo: "Atualize no script.js"
};


/* =========================================================
   MEMBROS IDENTIFICADOS NAS IMAGENS
========================================================= */

const MEMBROS = [
  {
    posicao: 1,
    nome: "「예수」 ✨W",
    cargo: "Colíder",
    cv: 18,
    bc: 10,
    nivel: 261
  },

  {
    posicao: 8,
    nome: "lia",
    cargo: "Líder",
    cv: 18,
    bc: 10,
    nivel: 172
  },

  {
    posicao: 9,
    nome: "choque nelas",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 241
  },

  {
    posicao: 10,
    nome: "BrizaJhow ⚡",
    cargo: "Membro",
    cv: 18,
    bc: 9,
    nivel: 218
  },

  {
    posicao: 11,
    nome: "H3INS",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 230
  },

  {
    posicao: 12,
    nome: "Kashin Koji💀",
    cargo: "Membro",
    cv: 18,
    bc: 10,
    nivel: 239
  },

  {
    posicao: 13,
    nome: "Wayne F/A",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 262
  },

  {
    posicao: 14,
    nome: "tividas",
    cargo: "Membro",
    cv: 18,
    bc: 10,
    nivel: 223
  },

  {
    posicao: 15,
    nome: "VILA SOMBRIA",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 211
  },

  {
    posicao: 16,
    nome: "⚡ ZEUS ⚡",
    cargo: "Ancião",
    cv: 17,
    bc: 10,
    nivel: 220
  },

  {
    posicao: 17,
    nome: "©®LEVEL-UP®©",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 253
  },

  {
    posicao: 18,
    nome: "Dmitri",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 174
  },

  {
    posicao: 19,
    nome: "MANIACO BR",
    cargo: "Membro",
    cv: 18,
    bc: 10,
    nivel: 233
  },

  {
    posicao: 20,
    nome: "ISABELA 2",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 197
  },

  {
    posicao: 21,
    nome: "♤ Nazarick ♤",
    cargo: "Ancião",
    cv: 18,
    bc: 10,
    nivel: 258
  },

  {
    posicao: 22,
    nome: "Choque jr",
    cargo: "Ancião",
    cv: 15,
    bc: 9,
    nivel: 142
  },

  {
    posicao: 23,
    nome: "desertgoblin",
    cargo: "Membro",
    cv: 17,
    bc: 10,
    nivel: 203
  },

  {
    posicao: 24,
    nome: "King dragon",
    cargo: "Membro",
    cv: 15,
    bc: 10,
    nivel: 166
  },

  {
    posicao: 25,
    nome: "XxPedroxX",
    cargo: "Ancião",
    cv: 13,
    bc: 6,
    nivel: 96
  },

  {
    posicao: 26,
    nome: "FIFA",
    cargo: "Membro",
    cv: 8,
    bc: 3,
    nivel: 40
  },

  {
    posicao: 29,
    nome: "MT09",
    cargo: "Colíder",
    cv: 12,
    bc: 6,
    nivel: 115
  },

  {
    posicao: 44,
    nome: "Nathalia",
    cargo: "Membro",
    cv: 18,
    bc: 6,
    nivel: 167
  }
];


/* =========================================================
   MENU
========================================================= */

const menuBtn =
  document.getElementById("menuBtn");

const menu =
  document.getElementById("menu");

menuBtn?.addEventListener(
  "click",
  () => {
    menu?.classList.toggle("ativo");
  }
);

document
  .querySelectorAll(".menu a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {
        menu?.classList.remove("ativo");
      }
    );

  });


/* =========================================================
   DADOS DO CLÃ
========================================================= */

function carregarDadosClan() {

  document.getElementById("nomeTopo").textContent =
    DADOS_CLAN.nome;

  document.getElementById("tagTopo").textContent =
    DADOS_CLAN.tag;

  document.getElementById("descricaoClan").textContent =
    DADOS_CLAN.descricao;

  document.getElementById("statMembros").textContent =
    DADOS_CLAN.membros;

  document.getElementById("statNivel").textContent =
    DADOS_CLAN.nivel;

  document.getElementById("statPontos").textContent =
    DADOS_CLAN.pontos;

  document.getElementById("statVitorias").textContent =
    DADOS_CLAN.vitorias;

  document.getElementById("statSequencia").textContent =
    DADOS_CLAN.sequencia;

  document.getElementById("statLiga").textContent =
    DADOS_CLAN.liga;
}


/* =========================================================
   GUERRA
========================================================= */

function carregarGuerra() {

  document.getElementById("nomeFenix").textContent =
    GUERRA_ATUAL.nomeClan;

  document.getElementById("estrelasFenix").textContent =
    `${GUERRA_ATUAL.estrelasClan} ⭐`;

  document.getElementById("destruicaoFenix").textContent =
    `${GUERRA_ATUAL.destruicaoClan}% destruição`;

  document.getElementById("nomeAdversario").textContent =
    GUERRA_ATUAL.adversario;

  document.getElementById("estrelasRival").textContent =
    `${GUERRA_ATUAL.estrelasRival} ⭐`;

  document.getElementById("destruicaoRival").textContent =
    `${GUERRA_ATUAL.destruicaoRival}% destruição`;

  document.getElementById("estadoGuerra").textContent =
    GUERRA_ATUAL.estado;

  document.getElementById("tempoGuerra").textContent =
    GUERRA_ATUAL.tempo;
}


/* =========================================================
   RANKING POR POSIÇÃO
========================================================= */

function carregarRanking() {

  const rankingLista =
    document.getElementById("rankingLista");

  const ranking =
    [...MEMBROS]
      .sort(
        (a, b) =>
          a.posicao - b.posicao
      );

  rankingLista.innerHTML =
    ranking.map(
      membro => `

      <article
        class="ranking-item
        ${membro.posicao === 1 ? "top1" : ""}"
      >

        <div class="posicao">
          ${membro.posicao}
        </div>

        <div>

          <strong>
            ${membro.nome}
          </strong>

          <small>
            ${membro.cargo}
            • CV ${membro.cv}
            • BC ${membro.bc}
          </small>

        </div>

        <div class="ranking-trofeus">
          Nv. ${membro.nivel}
        </div>

      </article>

    `
    )
    .join("");
}


/* =========================================================
   CARDS DOS MEMBROS
========================================================= */

function mostrarMembros(lista) {

  const grid =
    document.getElementById("membrosGrid");

  if (!lista.length) {

    grid.innerHTML =
      "<p>Nenhum membro encontrado.</p>";

    return;
  }

  const ordenados =
    [...lista].sort(
      (a, b) =>
        a.posicao - b.posicao
    );

  grid.innerHTML =
    ordenados.map(
      membro => `

      <article class="membro-card">

        <div class="membro-topo">

          <div class="membro-nome">
            ${membro.nome}
          </div>

          <span class="cargo">
            ${membro.cargo}
          </span>

        </div>


        <div class="membro-dados">

          <div>
            <span>Posição</span>
            <strong>
              #${membro.posicao}
            </strong>
          </div>

          <div>
            <span>Nível</span>
            <strong>
              ${membro.nivel}
            </strong>
          </div>

          <div>
            <span>Centro de Vila</span>
            <strong>
              CV ${membro.cv}
            </strong>
          </div>

          <div>
            <span>Base do Construtor</span>
            <strong>
              BC ${membro.bc}
            </strong>
          </div>

        </div>

      </article>

    `
    )
    .join("");
}


/* =========================================================
   FILTRO DE CARGOS
========================================================= */

document
  .querySelectorAll(".filtro")
  .forEach(botao => {

    botao.addEventListener(
      "click",
      () => {

        document
          .querySelectorAll(".filtro")
          .forEach(
            item =>
              item.classList.remove("ativo")
          );

        botao.classList.add("ativo");

        const cargo =
          botao.dataset.cargo;

        if (cargo === "todos") {

          mostrarMembros(MEMBROS);

          return;
        }

        const filtrados =
          MEMBROS.filter(
            membro =>
              membro.cargo === cargo
          );

        mostrarMembros(filtrados);

      }
    );

  });


/* =========================================================
   INICIAR SITE
========================================================= */

carregarDadosClan();

carregarGuerra();

carregarRanking();

mostrarMembros(MEMBROS);


/* =========================================================
   CENTRAL DE LAYOUTS
   Fontes públicas pesquisadas em agosto de 2026.
========================================================= */

const LAYOUTS = [
  /* CV12 */
  {
    cv: 12,
    tipo: "guerra",
    titulo: "CV12 Guerra • Anti 2 / Anti 3",
    descricao: "Base voltada para defesa de estrelas em Guerra e CWL.",
    imagem: "https://clashcodes.com/uploads/images/202307/image_870x580_64b85047180d7.jpg",
    link: "https://clashcodes.com/top-5-coc-th12-bases-for-war-farm-hybrid-defense",
    fonte: "https://clashcodes.com/top-5-coc-th12-bases-for-war-farm-hybrid-defense"
  },
  {
    cv: 12,
    tipo: "farm",
    titulo: "CV12 Farm • Proteção de recursos",
    descricao: "Layout para proteger recursos durante evolução e farming.",
    imagem: "https://clashcodes.com/uploads/images/202307/image_870x580_64b85047180d7.jpg",
    link: "https://cocbase.net/town-hall-12-farming-layouts",
    fonte: "https://cocbase.net/town-hall-12-farming-layouts"
  },
  {
    cv: 12,
    tipo: "push",
    titulo: "CV12 Push • Defesa de troféus",
    descricao: "Base de defesa para subir troféus e dificultar 2–3 estrelas.",
    imagem: "https://clashcodes.com/uploads/images/202307/image_870x580_64b85047180d7.jpg",
    link: "https://clashcodes.com/top-5-coc-th12-bases-for-war-farm-hybrid-defense",
    fonte: "https://clashcodes.com/top-5-coc-th12-bases-for-war-farm-hybrid-defense"
  },

  /* CV13 */
  {
    cv: 13,
    tipo: "guerra",
    titulo: "CV13 • World Championship War",
    descricao: "Layout competitivo de guerra com compartimentos e núcleo protegido.",
    imagem: "https://clashcodes.com/uploads/bases/coc-th13-world-championship-winning-base-design-war-2.jpg",
    link: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH13:WB:AAAAGgAAAAJ4jRMf6g3uypCMz9WANgfC",
    fonte: "https://clashcodes.com/top-10-best-th13-layouts-for-clash-of-clans"
  },
  {
    cv: 13,
    tipo: "farm",
    titulo: "CV13 • Hybrid Farm",
    descricao: "Base híbrida para equilibrar proteção de recursos e troféus.",
    imagem: "https://clashcodes.com/uploads/bases/coc-top-th13-hybrid-base-layout-copy-link-4.jpg",
    link: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH13:WB:AAAAGgAAAAJ4jUHTV2SMUhRuAUCidaFZ",
    fonte: "https://clashcodes.com/top-10-best-th13-layouts-for-clash-of-clans"
  },
  {
    cv: 13,
    tipo: "push",
    titulo: "CV13 • Anti E-Dragon Push",
    descricao: "Base de Push/Legend desenhada para reduzir valor de Electro Dragons.",
    imagem: "https://clashcodes.com/uploads/bases/coc-th13-anti-electro-dragon-base-trophy-push-1.jpg",
    link: "https://link.clashofclans.com/it/?action=OpenLayout&id=TH13:WB:AAAAAHQAAAAJsGMGY0cu3DQLf2ZrFYeq8",
    fonte: "https://clashcodes.com/top-10-best-th13-layouts-for-clash-of-clans"
  },

  /* CV14 */
  {
    cv: 14,
    tipo: "guerra",
    titulo: "CV14 • Anti 3 Estrelas",
    descricao: "Seleção de bases CV14 para guerra, com foco em defesa contra triples.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-best-th14-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense",
    fonte: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense"
  },
  {
    cv: 14,
    tipo: "farm",
    titulo: "CV14 • Hybrid / Farm",
    descricao: "Layout híbrido para defesa de recursos e Home Village.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-best-th14-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense",
    fonte: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense"
  },
  {
    cv: 14,
    tipo: "push",
    titulo: "CV14 • CWL / Push",
    descricao: "Base selecionada para CWL, Legend e defesa de troféus.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-best-th14-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense",
    fonte: "https://clashcodes.com/top-5-best-coc-th14-base-links-war-hybrid-farming-defense"
  },

  /* CV15 */
  {
    cv: 15,
    tipo: "guerra",
    titulo: "CV15 • Anti Everything War",
    descricao: "Base para Guerra com foco em quebrar pathing e evitar 3 estrelas.",
    imagem: "https://clashcodes.com/uploads/bases/top-th15-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming",
    fonte: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming"
  },
  {
    cv: 15,
    tipo: "farm",
    titulo: "CV15 • Hybrid Farming",
    descricao: "Design híbrido para guerra e proteção de recursos.",
    imagem: "https://clashcodes.com/uploads/bases/top-th15-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming",
    fonte: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming"
  },
  {
    cv: 15,
    tipo: "push",
    titulo: "CV15 • Legend Push",
    descricao: "Seleção para Legend League e defesa contra E-Dragon/Super Blimp.",
    imagem: "https://clashcodes.com/uploads/bases/top-th15-base-links.jpg",
    link: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming",
    fonte: "https://clashcodes.com/top-5-best-coc-th15-base-links-war-hybrid-farming"
  },

  /* CV16 */
  {
    cv: 16,
    tipo: "guerra",
    titulo: "CV16 • Anti RC Walk",
    descricao: "War base voltada para atrapalhar RC/Queen Walk e funil do atacante.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-th16-base-links.jpg",
    link: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense",
    fonte: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense"
  },
  {
    cv: 16,
    tipo: "farm",
    titulo: "CV16 • Hybrid Farming",
    descricao: "Base híbrida com defesa contra Blimp e proteção para farming.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-th16-base-links.jpg",
    link: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense",
    fonte: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense"
  },
  {
    cv: 16,
    tipo: "push",
    titulo: "CV16 • Legend / Anti E-Dragon",
    descricao: "Layout de Push/Legend com espaçamento para reduzir chain de E-Drag.",
    imagem: "https://clashcodes.com/uploads/bases/top-5-th16-base-links.jpg",
    link: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense",
    fonte: "https://clashcodes.com/top-th16-base-links-war-legend-rc-walk-defense"
  },

  /* CV17 */
  {
    cv: 17,
    tipo: "guerra",
    titulo: "CV17 • Top War Base",
    descricao: "Layout de Guerra CV17 com foco em defesa competitiva.",
    imagem: "https://clashcodes.com/clash-of-clans/bases/top-war-base-th17-clash-of-clans-1.jpg",
    link: "https://link.clashofclans.com/jp/?action=OpenLayout&id=TH17:WB:AAAAAFgAAAAJ5PKoQ0r7wsJvKm0JnXlVP",
    fonte: "https://clashcodes.com/top-10-town-hall-17-layouts-th17-base-clash-of-clans"
  },
  {
    cv: 17,
    tipo: "farm",
    titulo: "CV17 • Anti 2 Home Village",
    descricao: "Home Village forte para defesa e uso híbrido/farming.",
    imagem: "https://clashcodes.com/clash-of-clans/bases/undefeated-th17-anti-2-star-home-village-coc-2.jpg",
    link: "https://link.clashofclans.com/jp/?action=OpenLayout&id=TH17:HV:AAAAAVAAAAAG9yo8gzz8dI5zhre12xj1Y",
    fonte: "https://clashcodes.com/top-10-town-hall-17-layouts-th17-base-clash-of-clans"
  },
  {
    cv: 17,
    tipo: "push",
    titulo: "CV17 • Anti Air / Push",
    descricao: "Base desenhada para segurar ataques aéreos e uso competitivo.",
    imagem: "https://clashcodes.com/clash-of-clans/bases/insane-th17-anti-air-layout-clan-wars-3.jpg",
    link: "https://link.clashofclans.com/en/?action=OpenLayout&id=TH17:WB:AAAAAGwAAAAJ0R2VeTaxtYXvTrnA8yftm",
    fonte: "https://clashcodes.com/top-10-town-hall-17-layouts-th17-base-clash-of-clans"
  },

  /* CV18 */
  {
    cv: 18,
    tipo: "guerra",
    titulo: "CV18 • RC Walk War Defense",
    descricao: "Seleção de guerra contra RC Walk, Root Riders e ataques atuais.",
    imagem: "https://clashcodes.com/uploads/bases/pro-th18-top-10-town-hall-18-base-links.jpg",
    link: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025",
    fonte: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025"
  },
  {
    cv: 18,
    tipo: "farm",
    titulo: "CV18 • Hybrid Farm",
    descricao: "Base com foco em proteção de recursos e defesa híbrida.",
    imagem: "https://clashcodes.com/uploads/bases/pro-th18-top-10-town-hall-18-base-links.jpg",
    link: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025",
    fonte: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025"
  },
  {
    cv: 18,
    tipo: "push",
    titulo: "CV18 • Legend / Anti 2",
    descricao: "Base CV18 para Push e Legend com deadzones e núcleo reforçado.",
    imagem: "https://clashcodes.com/uploads/bases/pro-th18-top-10-town-hall-18-base-links.jpg",
    link: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025",
    fonte: "https://clashcodes.com/pro-th18-base-links-top-10-town-hall-18-bases-clash-of-clans-2025"
  }
];

let cvLayoutAtivo = 18;
let tipoLayoutAtivo = "todos";

function nomeTipoLayout(tipo) {
  const nomes = {
    guerra: "⚔️ Guerra",
    farm: "🌾 Farm",
    push: "🏆 Push"
  };

  return nomes[tipo] || tipo;
}

function renderizarLayouts() {
  const grid = document.getElementById("layoutsGrid");
  const titulo = document.getElementById("tituloLayoutsAtivos");
  const quantidade = document.getElementById("quantidadeLayouts");

  if (!grid) return;

  const filtrados = LAYOUTS.filter(layout => {
    const mesmoCv = layout.cv === cvLayoutAtivo;
    const mesmoTipo =
      tipoLayoutAtivo === "todos" ||
      layout.tipo === tipoLayoutAtivo;

    return mesmoCv && mesmoTipo;
  });

  titulo.textContent = `Layouts CV${cvLayoutAtivo}`;
  quantidade.textContent =
    `${filtrados.length} ${filtrados.length === 1 ? "layout" : "layouts"}`;

  grid.innerHTML = filtrados.map((layout, indice) => `
    <article class="layout-card">

      <div class="layout-imagem">
        <img
          src="${layout.imagem}"
          alt="${layout.titulo}"
          loading="lazy"
          referrerpolicy="no-referrer"
          onerror="this.style.display='none'; this.parentElement.style.minHeight='180px';"
        >

        <span class="layout-selo">
          CV${layout.cv} • #${indice + 1}
        </span>
      </div>

      <div class="layout-card-conteudo">

        <span class="layout-tipo">
          ${nomeTipoLayout(layout.tipo)}
        </span>

        <h4>
          ${layout.titulo}
        </h4>

        <p>
          ${layout.descricao}
        </p>

        <div class="layout-acoes">

          <a
            class="btn-copiar-layout"
            href="${layout.link}"
            target="_blank"
            rel="noopener noreferrer"
          >
            🛡️ Copiar / abrir
          </a>

          <a
            class="btn-fonte-layout"
            href="${layout.fonte}"
            target="_blank"
            rel="noopener noreferrer"
            title="Ver fonte"
          >
            Fonte
          </a>

        </div>

      </div>

    </article>
  `).join("");
}

document
  .querySelectorAll(".layout-cv-btn")
  .forEach(botao => {

    botao.addEventListener("click", () => {

      document
        .querySelectorAll(".layout-cv-btn")
        .forEach(item => item.classList.remove("ativo"));

      botao.classList.add("ativo");

      cvLayoutAtivo =
        Number(botao.dataset.cv);

      renderizarLayouts();
    });

  });

document
  .querySelectorAll(".layout-filtro")
  .forEach(botao => {

    botao.addEventListener("click", () => {

      document
        .querySelectorAll(".layout-filtro")
        .forEach(item => item.classList.remove("ativo"));

      botao.classList.add("ativo");

      tipoLayoutAtivo =
        botao.dataset.tipo;

      renderizarLayouts();
    });

  });

renderizarLayouts();
