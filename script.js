const menuBtn=document.getElementById("menuBtn");const menu=document.getElementById("menu");menuBtn?.addEventListener("click",()=>menu?.classList.toggle("ativo"));document.querySelectorAll(".menu a").forEach(link=>link.addEventListener("click",()=>menu?.classList.remove("ativo")));

const dadosClan={membros:48,vitorias:145,liga:"Cristal I",sequencia:5};
document.getElementById("statMembros").textContent=dadosClan.membros;
document.getElementById("statVitorias").textContent=dadosClan.vitorias;
document.getElementById("statLiga").textContent=dadosClan.liga;
document.getElementById("statSequencia").textContent=dadosClan.sequencia;

const guerra={estrelasFenix:27,destruicaoFenix:92,adversario:"Clã Rival",estrelasRival:24,destruicaoRival:87,tempo:"Termina em 5h 32m"};
document.getElementById("estrelasFenix").textContent=`${guerra.estrelasFenix} ⭐`;
document.getElementById("destruicaoFenix").textContent=`${guerra.destruicaoFenix}% destruição`;
document.getElementById("nomeAdversario").textContent=guerra.adversario;
document.getElementById("estrelasRival").textContent=`${guerra.estrelasRival} ⭐`;
document.getElementById("destruicaoRival").textContent=`${guerra.destruicaoRival}% destruição`;
document.getElementById("tempoGuerra").textContent=guerra.tempo;

const LINK_RECRUTAMENTO="#";
document.getElementById("btnRecrutamento")?.addEventListener("click",(event)=>{if(LINK_RECRUTAMENTO==="#"){event.preventDefault();alert("Configure o LINK_RECRUTAMENTO no arquivo script.js.");return;}window.open(LINK_RECRUTAMENTO,"_blank");});
