// =========================================================
// Rei das Antenas | catálogo de produtos e orçamento pelo WhatsApp
//
// Para editar os produtos, mexa só na lista PRODUTOS abaixo.
// Cada produto pode ter uma foto: coloque o arquivo em assets/img/produtos/
// e preencha o campo img, por exemplo: img: "assets/img/produtos/antena-interna.jpg"
// =========================================================

// TODO: substituir pelos produtos do catálogo da página do Facebook da loja
const PRODUTOS = [
  { id: "antena-externa",   cat: "antenas",    nome: "Antena digital externa",          desc: "Modelo espinha de peixe, para telhado ou mastro." },
  { id: "antena-interna",   cat: "antenas",    nome: "Antena digital interna",          desc: "Compacta, para regiões com sinal forte." },
  { id: "kit-parabolica",   cat: "antenas",    nome: "Kit antena parabólica",           desc: "Antena, LNB e suporte para TV via satélite." },
  { id: "mastro",           cat: "antenas",    nome: "Mastro e suporte de antena",      desc: "Para fixação no telhado, na parede ou na laje." },
  { id: "cabo-coaxial",     cat: "cabos",      nome: "Cabo coaxial (metro)",            desc: "Para antena digital, parabólica e câmeras." },
  { id: "conector-f",       cat: "cabos",      nome: "Conector F",                      desc: "Encaixe de rosca para cabo coaxial." },
  { id: "divisor",          cat: "cabos",      nome: "Divisor de sinal",                desc: "Leva o sinal de uma antena para mais de uma TV." },
  { id: "amplificador",     cat: "cabos",      nome: "Amplificador de sinal",           desc: "Reforça o sinal em casas com várias TVs." },
  { id: "filtro-5g",        cat: "receptores", nome: "Filtro contra interferência 5G",  desc: "Resolve canais que somem por causa do sinal 5G." },
  { id: "conversor",        cat: "receptores", nome: "Conversor digital",               desc: "Para TVs antigas receberem o sinal digital." },
  { id: "receptor-parab",   cat: "receptores", nome: "Receptor de parabólica",          desc: "Receptor digital para antena parabólica." },
  { id: "controle-portao",  cat: "portoes",    nome: "Controle remoto de portão",       desc: "Controles novos e cópias, sob consulta do modelo." },
  { id: "camera",           cat: "cameras",    nome: "Câmera de segurança",             desc: "Para áreas internas e externas." },
  { id: "gravador",         cat: "cameras",    nome: "Gravador de câmeras (DVR)",       desc: "Grava as imagens e permite ver pelo celular." },
  { id: "fonte-camera",     cat: "cameras",    nome: "Fonte para câmera",               desc: "Alimentação para câmeras de segurança." },
  { id: "suporte-tv",       cat: "acessorios", nome: "Suporte de TV",                   desc: "Fixo ou articulado, para vários tamanhos." },
  { id: "controle-tv",      cat: "acessorios", nome: "Controle remoto universal",       desc: "Funciona com a maioria das marcas de TV." },
];

const CATEGORIAS = {
  antenas:    "Antenas",
  cabos:      "Cabos e conectores",
  receptores: "Receptores e filtros",
  portoes:    "Portões",
  cameras:    "Câmeras",
  acessorios: "Acessórios",
};

// ícones simples por categoria (usados enquanto não há foto do produto)
const ICONES = {
  antenas:    '<path d="M24 14v28M14 18h20M16 24h16M18 30h12M12 42h24M18 8a9 9 0 0 1 12 0"/>',
  cabos:      '<path d="M6 30c8 0 8-12 18-12s10 12 18 12"/><rect x="2" y="26" width="8" height="8" rx="2"/><rect x="38" y="26" width="8" height="8" rx="2"/>',
  receptores: '<rect x="6" y="16" width="36" height="16" rx="3"/><path d="M12 24h8M34 24h2M14 36v4M34 36v4"/>',
  portoes:    '<rect x="14" y="6" width="20" height="36" rx="6"/><circle cx="24" cy="17" r="3"/><path d="M20 27h8M20 33h8"/>',
  cameras:    '<path d="M6 14h26l8 6-8 6H6z"/><circle cx="30" cy="20" r="2.5"/><path d="M14 26v8M8 34h12"/>',
  acessorios: '<rect x="8" y="8" width="32" height="22" rx="2"/><path d="M24 30v8M16 40h16"/>',
};

const WHATSAPP = "5519974094897";
const CHAVE = "rda-orcamento";

// ---------- Estado: produtos escolhidos e quantidades ----------
let escolhidos = {};
try { escolhidos = JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { escolhidos = {}; }
// remove itens que não existem mais no catálogo
Object.keys(escolhidos).forEach((id) => { if (!PRODUTOS.some((p) => p.id === id)) delete escolhidos[id]; });

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(escolhidos)); } catch (e) { /* sem armazenamento: só não lembra */ }
}

const $ = (id) => document.getElementById(id);
const filtrosEl = $("filters");
const produtosEl = $("products");
const barra = $("quoteBar");
const gaveta = $("quoteDrawer");
const abrirBtn = $("quoteOpen");
let filtroAtual = "todos";

// ---------- Filtros por categoria ----------
function renderFiltros() {
  const cats = [["todos", "Todos"], ...Object.entries(CATEGORIAS).filter(([c]) => PRODUTOS.some((p) => p.cat === c))];
  filtrosEl.innerHTML = cats
    .map(([c, nome]) => `<button type="button" data-cat="${c}" aria-pressed="${c === filtroAtual}">${nome}</button>`)
    .join("");
}
filtrosEl.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  filtroAtual = b.dataset.cat;
  renderFiltros();
  renderProdutos();
});

// ---------- Cards de produto ----------
function acaoHTML(p) {
  const q = escolhidos[p.id] || 0;
  if (!q) return `<button type="button" class="add-btn" data-add="${p.id}">Adicionar ao orçamento</button>`;
  return `<div class="stepper" role="group" aria-label="Quantidade de ${p.nome}">
      <button type="button" data-menos="${p.id}" aria-label="Diminuir">−</button>
      <output>${q}</output>
      <button type="button" data-mais="${p.id}" aria-label="Aumentar">+</button>
    </div>`;
}

function cardHTML(p, n) {
  const img = p.img
    ? `<img src="${p.img}" alt="${p.nome}" loading="lazy">`
    : `<svg viewBox="0 0 48 48" aria-hidden="true">${ICONES[p.cat] || ""}</svg>`;
  return `<article class="product ${escolhidos[p.id] ? "picked" : ""}" data-id="${p.id}" style="--n:${n}">
      <div class="product-img">${img}</div>
      <div class="product-body">
        <span class="product-cat">${CATEGORIAS[p.cat] || ""}</span>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="product-action">${acaoHTML(p)}</div>
      </div>
    </article>`;
}

function renderProdutos() {
  const lista = PRODUTOS.filter((p) => filtroAtual === "todos" || p.cat === filtroAtual);
  produtosEl.innerHTML = lista.map(cardHTML).join("");
}

// atualiza só o card que mudou, sem redesenhar a grade (evita "piscar")
function atualizarCard(id) {
  const card = produtosEl.querySelector(`[data-id="${id}"]`);
  const p = PRODUTOS.find((x) => x.id === id);
  if (!card || !p) return;
  card.classList.toggle("picked", !!escolhidos[id]);
  card.querySelector(".product-action").innerHTML = acaoHTML(p);
  const out = card.querySelector("output");
  if (out) out.classList.add("bump");
}

function mudarQtd(id, delta) {
  const nova = Math.max(0, (escolhidos[id] || 0) + delta);
  if (nova) escolhidos[id] = nova;
  else delete escolhidos[id];
  salvar();
  atualizarCard(id);
  atualizarOrcamento(true);
}

document.addEventListener("click", (e) => {
  const add = e.target.closest("[data-add]");
  const mais = e.target.closest("[data-mais]");
  const menos = e.target.closest("[data-menos]");
  if (add) {
    mudarQtd(add.dataset.add, 1);
    // mantém o foco no controle novo, para quem usa teclado
    produtosEl.querySelector(`[data-id="${add.dataset.add}"] [data-mais]`)?.focus();
  }
  if (mais) mudarQtd(mais.dataset.mais, 1);
  if (menos) mudarQtd(menos.dataset.menos, -1);
});

// ---------- Mensagem do WhatsApp ----------
function mensagem() {
  const itens = PRODUTOS.filter((p) => escolhidos[p.id]).map((p) => `• ${escolhidos[p.id]}x ${p.nome}`);
  const obs = $("quoteNote").value.trim();
  return [
    "Olá! Vim pelo site e gostaria de um orçamento destes produtos:",
    "",
    ...itens,
    ...(obs ? ["", `Observação: ${obs}`] : []),
  ].join("\n");
}

function linkWhats() {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(mensagem())}`;
}

// ---------- Barra e gaveta do orçamento ----------
function atualizarOrcamento(animar) {
  const total = Object.values(escolhidos).reduce((a, b) => a + b, 0);
  barra.hidden = total === 0;
  const cont = $("quoteCount");
  cont.textContent = total;
  if (animar) { cont.classList.remove("bump"); void cont.offsetWidth; cont.classList.add("bump"); }
  $("quoteSendBar").href = linkWhats();
  $("quoteSend").href = linkWhats();
  if (!gaveta.hidden) renderGaveta();
  if (total === 0 && !gaveta.hidden) fecharGaveta();
}

function renderGaveta() {
  $("quoteList").innerHTML = PRODUTOS.filter((p) => escolhidos[p.id])
    .map((p) => `<li><strong>${p.nome}</strong>
        <div class="stepper" role="group" aria-label="Quantidade de ${p.nome}">
          <button type="button" data-menos="${p.id}" aria-label="Diminuir">−</button>
          <output>${escolhidos[p.id]}</output>
          <button type="button" data-mais="${p.id}" aria-label="Aumentar">+</button>
        </div></li>`)
    .join("");
}

function abrirGaveta() {
  renderGaveta();
  gaveta.hidden = false;
  abrirBtn.setAttribute("aria-expanded", "true");
  $("quoteClose").focus();
}
function fecharGaveta() {
  gaveta.hidden = true;
  abrirBtn.setAttribute("aria-expanded", "false");
  if (!barra.hidden) abrirBtn.focus();
}

abrirBtn.addEventListener("click", abrirGaveta);
$("quoteClose").addEventListener("click", fecharGaveta);
gaveta.addEventListener("click", (e) => { if (e.target === gaveta) fecharGaveta(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !gaveta.hidden) fecharGaveta(); });
$("quoteNote").addEventListener("input", () => { $("quoteSend").href = linkWhats(); $("quoteSendBar").href = linkWhats(); });
$("quoteClear").addEventListener("click", () => {
  escolhidos = {};
  salvar();
  renderProdutos();
  atualizarOrcamento(false);
});

// ---------- Início ----------
renderFiltros();
renderProdutos();
atualizarOrcamento(false);
