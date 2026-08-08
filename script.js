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
