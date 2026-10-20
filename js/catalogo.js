// =========================================================
// Rei das Antenas | catálogo de produtos e orçamento pelo WhatsApp
//
// Para editar os produtos, mexa só na lista PRODUTOS abaixo.
// Cada produto pode ter uma foto: coloque o arquivo em assets/img/produtos/
// e preencha o campo img, por exemplo: img: "assets/img/produtos/antena-interna.jpg"
// =========================================================

(() => {
// tudo dentro deste bloco fica isolado do resto do site

// TODO: confirmar com a loja os modelos que ela tem em estoque
// marca: fabricante do produto (aparece no card e entra na busca); deixe sem quando não houver
// tags: palavras extras que a busca também encontra
const PRODUTOS = [
  // antenas
  { id: "antena-externa",    cat: "antenas", nome: "Antena digital externa",                  desc: "Modelo espinha de peixe, para telhado ou mastro.", img: "assets/img/produtos/antena-externa.jpg", tags: "hdtv uhf" },
  { id: "antena-interna",    cat: "antenas", nome: "Antena digital interna",                  desc: "Compacta, para regiões com sinal forte.", img: "assets/img/produtos/antena-interna.jpg", tags: "hdtv" },
  { id: "antena-oberon-5m",  cat: "antenas", marca: "Oberon",  nome: "Antena digital HDTV Oberon OR-MI802", desc: "Com 5 m de cabo, pronta para ligar na TV.", img: "assets/img/produtos/antena-oberon-5m.jpg", tags: "hdtv" },
  { id: "antena-flex-5m",    cat: "antenas", marca: "Flex",    nome: "Antena digital HDTV Flex FX-ANT-6",   desc: "Pronta para ligar na TV. Confirme o tamanho do cabo na loja.", img: "assets/img/produtos/antena-flex-5m.jpg", tags: "hdtv" },
  { id: "antena-flex-3m",    cat: "antenas", marca: "Flex",    nome: "Antena digital HDTV Flex FX-ANT-3",   desc: "Com 3 m de cabo.", img: "assets/img/produtos/antena-flex-3m.jpg", tags: "hdtv" },
  { id: "antena-flex-amp",   cat: "antenas", marca: "Flex",    nome: "Antena digital interna com amplificador Flex FX-ANT-8", desc: "Amplificador de sinal embutido e 3 m de cabo.", img: "assets/img/produtos/antena-flex-amp.jpg", tags: "hdtv amplificada" },
  { id: "antena-bommax-5m",  cat: "antenas", marca: "Bommax",  nome: "Antena digital HDTV Bommax BM-A005A", desc: "Com 5 m de cabo.", img: "assets/img/produtos/antena-bommax-5m.jpg", tags: "hdtv" },
  { id: "kit-parabolica",    cat: "antenas", nome: "Kit antena parabólica",                   desc: "Antena, LNB e suporte para TV via satélite.", img: "assets/img/produtos/kit-parabolica.jpg", tags: "satelite lnb" },
  { id: "mastro",            cat: "antenas", nome: "Mastro e suporte de antena",              desc: "Para fixação no telhado, na parede ou na laje." },

  // receptores de parabólica e conversores
  { id: "midiabox",          cat: "receptores", marca: "Century", nome: "Receptor Century Midiabox", desc: "Receptor digital para parabólica, canais abertos em HD. Consulte os modelos.", tags: "midia box parabolica satelite" },
  { id: "tvsat",             cat: "receptores", nome: "Receptor TV SAT",                      desc: "Receptor digital para parabólica. Consulte os modelos.", tags: "tvsat parabolica satelite" },
  { id: "receptor-parab",    cat: "receptores", nome: "Receptor de parabólica",               desc: "Receptor digital para antena parabólica.", tags: "satelite" },
  { id: "conversor",         cat: "receptores", nome: "Conversor digital",                    desc: "Para TVs antigas receberem o sinal digital.", img: "assets/img/produtos/conversor.jpg", tags: "set top box" },
  { id: "filtro-5g",         cat: "receptores", nome: "Filtro contra interferência 5G",       desc: "Resolve canais que somem por causa do sinal 5G." },

  // tv box e streaming
  { id: "fire-stick-hd",     cat: "tvbox", marca: "Amazon", nome: "Amazon Fire TV Stick HD",        desc: "8 GB, Wi-Fi 5. Transforma a TV em Smart TV.", img: "assets/img/produtos/fire-stick-hd.jpg", tags: "streaming midia box smart" },
  { id: "fire-stick-4k",     cat: "tvbox", marca: "Amazon", nome: "Amazon Fire TV Stick 4K Select", desc: "8 GB, Wi-Fi 5, imagem em 4K.", img: "assets/img/produtos/fire-stick-4k.jpg", tags: "streaming midia box smart" },
  { id: "fire-stick-4k-plus", cat: "tvbox", marca: "Amazon", nome: "Amazon Fire TV Stick 4K Plus",  desc: "8 GB, Wi-Fi 6, imagem em 4K.", img: "assets/img/produtos/fire-stick-4k-plus.jpg", tags: "streaming midia box smart" },
  { id: "fonte-tvbox",       cat: "tvbox", nome: "Fonte bivolt 5V 2A para TV Box",            desc: "Reposição da fonte de aparelhos TV Box.", img: "assets/img/produtos/fonte-tvbox.jpg", tags: "carregador midia box" },

  // controles remotos de TV
  { id: "controle-tv",       cat: "controles", nome: "Controle remoto universal",             desc: "Funciona com a maioria das marcas de TV.", img: "assets/img/produtos/controle-tv.jpg" },
  { id: "controle-lg",       cat: "controles", marca: "Lelong", nome: "Controle remoto para TV LG",      desc: "Modelo LE-7045.", img: "assets/img/produtos/controle-lg.jpg" },
  { id: "controle-samsung",  cat: "controles", marca: "Lelong", nome: "Controle remoto para TV Samsung", desc: "Modelo LE-7028.", img: "assets/img/produtos/controle-samsung.jpg" },
  { id: "controle-philco",   cat: "controles", marca: "Lelong", nome: "Controle remoto para TV Philco",  desc: "Modelo LE-7250.", img: "assets/img/produtos/controle-philco.jpg" },
  { id: "controle-philips",  cat: "controles", marca: "ATF",    nome: "Controle remoto para TV Philips", desc: "Modelo 7276.", img: "assets/img/produtos/controle-philips.jpg" },
  { id: "controle-aoc",      cat: "controles", marca: "Sky",    nome: "Controle remoto para TV AOC",     desc: "Modelo 8050.", img: "assets/img/produtos/controle-aoc.jpg" },
  { id: "controle-tvbox",    cat: "controles", nome: "Controle remoto para Smart TV Box",     desc: "Reposição para aparelhos TV Box.", img: "assets/img/produtos/controle-tvbox.jpg", tags: "midia box" },
  { id: "controle-teclado",  cat: "controles", marca: "Exbom",  nome: "Controle com teclado para Smart TV", desc: "Teclado e controle em um só, com luz. Modelo BK-BTI8LED.", img: "assets/img/produtos/controle-teclado.jpg", tags: "air mouse" },

  // controles de portão
  { id: "controle-portao",   cat: "portao", nome: "Cópia de controle de portão",             desc: "Copiamos o seu controle. Traga o original para conferir o modelo.", img: "assets/img/produtos/controle-portao.png", tags: "copia clonar" },
  { id: "portao-linear",     cat: "portao", marca: "Linear",   nome: "Controle de portão Linear HCS", desc: "3 botões, 433 MHz.", tags: "tx" },
  { id: "portao-ppa",        cat: "portao", marca: "PPA",      nome: "Controle de portão PPA",       desc: "433 MHz.", tags: "toque" },
  { id: "portao-garen",      cat: "portao", marca: "Garen",    nome: "Controle de portão Garen",     desc: "433 MHz." },
  { id: "portao-rossi",      cat: "portao", marca: "Rossi",    nome: "Controle de portão Rossi",     desc: "433 MHz." },
  { id: "portao-peccinin",   cat: "portao", marca: "Peccinin", nome: "Controle de portão Peccinin",  desc: "433 MHz." },
  { id: "portao-multi",      cat: "portao", nome: "Controle de portão multimarcas",           desc: "Aprende o código de vários modelos. Confirme na loja se serve no seu portão.", tags: "clonador universal copiador" },

  // suportes de TV
  { id: "suporte-fortrek",   cat: "suportes", marca: "Fortrek",   nome: "Suporte fixo universal para TV Fortrek FK310S",    desc: "Deixa a TV rente à parede. Consulte o tamanho da sua TV.", img: "assets/img/produtos/suporte-fortrek.jpg", tags: "parede" },
  { id: "suporte-brasforma-fixo", cat: "suportes", marca: "Brasforma", nome: "Suporte fixo universal para TV Brasforma SBRU951", desc: "Deixa a TV rente à parede. Consulte o tamanho da sua TV.", img: "assets/img/produtos/suporte-brasforma-fixo.jpg", tags: "parede" },
  { id: "suporte-brasforma-art",  cat: "suportes", marca: "Brasforma", nome: "Suporte articulado universal para TV Brasforma",  desc: "Puxa e gira a TV para o lado. Consulte o tamanho da sua TV.", img: "assets/img/produtos/suporte-brasforma-art.jpg", tags: "parede movel braco" },

  // cabos e conectores
  { id: "cabo-coaxial",      cat: "cabos", nome: "Cabo coaxial (metro)",                      desc: "Para antena digital, parabólica e câmeras.", img: "assets/img/produtos/cabo-coaxial.jpg" },
  { id: "conector-f",        cat: "cabos", nome: "Conector F",                                desc: "Encaixe de rosca para cabo coaxial.", img: "assets/img/produtos/conector-f.jpg" },
  { id: "divisor",           cat: "cabos", nome: "Divisor de sinal",                          desc: "Leva o sinal de uma antena para mais de uma TV.", img: "assets/img/produtos/divisor.jpg" },
  { id: "amplificador",      cat: "cabos", nome: "Amplificador de sinal",                     desc: "Reforça o sinal em casas com várias TVs." },

  // câmeras
  { id: "camera",            cat: "cameras", nome: "Câmera de segurança",                     desc: "Para áreas internas e externas.", img: "assets/img/produtos/camera.jpg" },
  { id: "gravador",          cat: "cameras", nome: "Gravador de câmeras (DVR)",               desc: "Grava as imagens e permite ver pelo celular.", img: "assets/img/produtos/gravador.jpg" },
  { id: "fonte-camera",      cat: "cameras", nome: "Fonte para câmera",                       desc: "Alimentação para câmeras de segurança.", img: "assets/img/produtos/fonte-camera.jpg" },
];

const CATEGORIAS = {
  antenas:    "Antenas",
  receptores: "Receptores e conversores",
  tvbox:      "TV Box e streaming",
  controles:  "Controles remotos",
  portao:     "Controles de portão",
  suportes:   "Suportes de TV",
  cabos:      "Cabos e conectores",
  cameras:    "Câmeras",
};

// ícones simples por categoria (usados enquanto não há foto do produto)
const ICONES = {
  antenas:    '<path d="M24 14v28M14 18h20M16 24h16M18 30h12M12 42h24M18 8a9 9 0 0 1 12 0"/>',
  receptores: '<rect x="6" y="16" width="36" height="16" rx="3"/><path d="M12 24h8M34 24h2M14 36v4M34 36v4"/>',
  tvbox:      '<rect x="6" y="8" width="36" height="24" rx="2"/><path d="M18 40h12M24 32v8"/><rect x="31" y="27" width="10" height="5" rx="1.5"/>',
  controles:  '<rect x="16" y="4" width="16" height="40" rx="5"/><circle cx="24" cy="12" r="2.5"/><path d="M20 21h8M20 27h8M20 33h8"/>',
  portao:     '<rect x="14" y="6" width="20" height="36" rx="6"/><circle cx="24" cy="17" r="3"/><path d="M20 27h8M20 33h8"/>',
  suportes:   '<path d="M6 8v32M6 18h10l6 6M6 30h10l6-6"/><rect x="24" y="12" width="18" height="24" rx="2"/>',
  cabos:      '<path d="M6 30c8 0 8-12 18-12s10 12 18 12"/><rect x="2" y="26" width="8" height="8" rx="2"/><rect x="38" y="26" width="8" height="8" rx="2"/>',
  cameras:    '<path d="M6 14h26l8 6-8 6H6z"/><circle cx="30" cy="20" r="2.5"/><path d="M14 26v8M8 34h12"/>',
};

const WHATSAPP = "5519974094897";
const CHAVE = "rda-orcamento";
const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Estado: produtos escolhidos e quantidades ----------
let escolhidos = {};
try { escolhidos = JSON.parse(localStorage.getItem(CHAVE)) || {}; } catch (e) { escolhidos = {}; }
// remove itens que não existem mais no catálogo
Object.keys(escolhidos).forEach((id) => { if (!PRODUTOS.some((p) => p.id === id)) delete escolhidos[id]; });

function salvar() {
  try { localStorage.setItem(CHAVE, JSON.stringify(escolhidos)); } catch (e) { /* sem armazenamento: só não lembra */ }
}

const $ = (id) => document.getElementById(id);
const produtosEl = $("products");
const barra = $("quoteBar");
const gaveta = $("quoteDrawer");
const abrirBtn = $("quoteOpen");

// ---------- Busca e filtros (ficam no endereço da página, dá para compartilhar o link) ----------
const ordemEl = $("ordem");
const porPagEl = $("porPagina");
const buscaEl = $("busca");
const lado = $("catSide");
const toggleBtn = $("catToggle");

const url = new URLSearchParams(location.search);
const estado = {
  q: (url.get("q") || "").trim(),
  cat: CATEGORIAS[url.get("cat")] ? url.get("cat") : "todos",
  ordem: ["relevancia", "az", "za", "categoria"].includes(url.get("ordem")) ? url.get("ordem") : "relevancia",
  porPag: ["12", "24", "0"].includes(url.get("n")) ? Number(url.get("n")) : 12,
  pag: Math.max(1, Number(url.get("p")) || 1),
};
buscaEl.value = estado.q;
ordemEl.value = estado.ordem;
porPagEl.value = String(estado.porPag);

// tira acentos e maiúsculas, para "parabolica" achar "parabólica"
const normal = (t) => (t || "").normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
PRODUTOS.forEach((p) => {
  p._nome = normal(p.nome);
  p._texto = normal([p.nome, p.desc, p.marca, CATEGORIAS[p.cat], p.tags].join(" "));
});
const termos = () => normal(estado.q).split(/\s+/).filter(Boolean);

// todas as palavras precisam aparecer; achar no nome vale mais que na descrição
function pontos(p, ts) {
  if (!ts.length) return 1;
  let total = 0;
  for (const t of ts) {
    if (!p._texto.includes(t)) return 0;
    total += p._nome.includes(t) ? (p._nome.startsWith(t) ? 3 : 2) : 1;
  }
  return total;
}

// produtos que batem com a busca, antes dos filtros (base das contagens)
function porBusca() {
  const ts = termos();
  return PRODUTOS.map((p) => ({ p, s: pontos(p, ts) })).filter((x) => x.s > 0);
}

function filtrados() {
  const base = porBusca().filter(({ p }) =>
    estado.cat === "todos" || p.cat === estado.cat);
  const nomeAZ = (a, b) => a.p.nome.localeCompare(b.p.nome, "pt-BR");
  const ordemCat = Object.keys(CATEGORIAS);
  if (estado.ordem === "az") base.sort(nomeAZ);
  else if (estado.ordem === "za") base.sort((a, b) => nomeAZ(b, a));
  else if (estado.ordem === "categoria") base.sort((a, b) => ordemCat.indexOf(a.p.cat) - ordemCat.indexOf(b.p.cat) || nomeAZ(a, b));
  else if (termos().length) base.sort((a, b) => b.s - a.s);   // sem busca, mantém a ordem da lista
  return base.map((x) => x.p);
}

function salvarURL() {
  const u = new URLSearchParams();
  if (estado.q) u.set("q", estado.q);
  if (estado.cat !== "todos") u.set("cat", estado.cat);
  if (estado.ordem !== "relevancia") u.set("ordem", estado.ordem);
  if (estado.porPag !== 12) u.set("n", estado.porPag);
  if (estado.pag > 1) u.set("p", estado.pag);
  const qs = u.toString();
  history.replaceState(null, "", qs ? `?${qs}` : location.pathname);
}

const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

function renderLado() {
  // categorias contam respeitando a busca
  const achados = porBusca().map((x) => x.p);
  const cats = [["todos", "Todas as categorias", achados.length],
    ...Object.entries(CATEGORIAS).map(([c, nome]) => [c, nome, achados.filter((p) => p.cat === c).length])];
  $("catList").innerHTML = cats
    .filter(([c, , n]) => n > 0 || c === estado.cat || c === "todos")
    .map(([c, nome, n]) => `<li><button type="button" data-cat="${c}" aria-pressed="${c === estado.cat}"><span>${nome}</span><small>${n}</small></button></li>`)
    .join("");

  $("catClear").hidden = estado.cat === "todos" && !estado.q;
  $("catToggleCount").textContent = estado.cat !== "todos" ? "(1)" : "";
}

// filtros em uso, cada um com um × para tirar
function renderChips() {
  const chips = [];
  if (estado.q) chips.push(`<button type="button" data-tira="q" aria-label="Tirar busca ${esc(estado.q)}">Busca: “${esc(estado.q)}” <span aria-hidden="true">×</span></button>`);
  if (estado.cat !== "todos") chips.push(`<button type="button" data-tira="cat" aria-label="Tirar filtro ${CATEGORIAS[estado.cat]}">${CATEGORIAS[estado.cat]} <span aria-hidden="true">×</span></button>`);
  $("catChips").innerHTML = chips.join("");
}

function renderPager(total) {
  const pager = $("pager");
  const paginas = estado.porPag ? Math.ceil(total / estado.porPag) : 1;
  if (paginas <= 1) { pager.innerHTML = ""; return; }
  let html = `<button type="button" data-pag="${estado.pag - 1}" ${estado.pag === 1 ? "disabled" : ""} aria-label="Página anterior">‹</button>`;
  for (let i = 1; i <= paginas; i++) {
    html += `<button type="button" data-pag="${i}" ${i === estado.pag ? 'aria-current="page"' : ""} aria-label="Página ${i}">${i}</button>`;
  }
  html += `<button type="button" data-pag="${estado.pag + 1}" ${estado.pag === paginas ? "disabled" : ""} aria-label="Próxima página">›</button>`;
  pager.innerHTML = html;
}

// ---------- Cards de produto ----------
function acaoHTML(p) {
  const q = escolhidos[p.id] || 0;
  if (!q) return `<button type="button" class="add-btn" data-add="${p.id}" aria-label="Adicionar ${p.nome} ao orçamento">Adicionar</button>`;
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
      <div class="product-img">${img}<span class="glare" aria-hidden="true"></span>
        <span class="picked-badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg><b>${escolhidos[p.id] || ""}</b></span>
      </div>
      <div class="product-body">
        <span class="product-cat">${CATEGORIAS[p.cat] || ""}${p.marca ? ` · ${p.marca}` : ""}</span>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="product-action">${acaoHTML(p)}</div>
      </div>
    </article>`;
}

function renderProdutos() {
  const lista = filtrados();
  const total = lista.length;
  const paginas = estado.porPag ? Math.max(1, Math.ceil(total / estado.porPag)) : 1;
  estado.pag = Math.min(estado.pag, paginas);
  const ini = estado.porPag ? (estado.pag - 1) * estado.porPag : 0;
  const pagina = estado.porPag ? lista.slice(ini, ini + estado.porPag) : lista;

  produtosEl.innerHTML = pagina.map(cardHTML).join("");
  $("catEmpty").hidden = total > 0;

  const plural = total === 1 ? "produto" : "produtos";
  const faixa = total > pagina.length ? ` · mostrando ${ini + 1} a ${ini + pagina.length}` : "";
  $("catInfo").innerHTML = estado.q
    ? `<strong>${total}</strong> ${plural} para “${esc(estado.q)}”${faixa}`
    : `<strong>${total}</strong> ${plural}${faixa}`;

  renderLado();
  renderChips();
  renderPager(total);
  salvarURL();
}

// atualiza só o card que mudou, sem redesenhar a grade (evita "piscar")
function atualizarCard(id) {
  const card = produtosEl.querySelector(`[data-id="${id}"]`);
  const p = PRODUTOS.find((x) => x.id === id);
  if (!card || !p) return;
  card.classList.toggle("picked", !!escolhidos[id]);
  card.querySelector(".picked-badge b").textContent = escolhidos[id] || "";
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
  if (add || mais) voar(e.target.closest(".product") || null);
  if (add) {
    mudarQtd(add.dataset.add, 1);
    // mantém o foco no controle novo, para quem usa teclado
    produtosEl.querySelector(`[data-id="${add.dataset.add}"] [data-mais]`)?.focus();
  }
  if (mais) mudarQtd(mais.dataset.mais, 1);
  if (menos) mudarQtd(menos.dataset.menos, -1);
});

// ---------- Eventos da busca e dos filtros ----------
let digitando;
buscaEl.addEventListener("input", () => {
  clearTimeout(digitando);
  digitando = setTimeout(() => { estado.q = buscaEl.value.trim(); estado.pag = 1; renderProdutos(); }, 200);
});
$("catSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(digitando);
  estado.q = buscaEl.value.trim();
  estado.pag = 1;
  renderProdutos();
  buscaEl.blur();   // fecha o teclado no celular
});

$("catList").addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  estado.cat = b.dataset.cat;
  estado.pag = 1;
  renderProdutos();
  // celular: fecha o painel para mostrar os produtos da categoria escolhida
  if (getComputedStyle(toggleBtn).display !== "none" && lado.classList.contains("open")) {
    lado.classList.remove("open");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "start" });
  }
});

function limparTudo() {
  estado.q = "";
  buscaEl.value = "";
  estado.cat = "todos";
  estado.pag = 1;
  renderProdutos();
}
$("catClear").addEventListener("click", limparTudo);
$("catEmptyClear").addEventListener("click", limparTudo);

$("catChips").addEventListener("click", (e) => {
  const b = e.target.closest("[data-tira]");
  if (!b) return;
  if (b.dataset.tira === "q") { estado.q = ""; buscaEl.value = ""; }
  if (b.dataset.tira === "cat") estado.cat = "todos";
  estado.pag = 1;
  renderProdutos();
});

ordemEl.addEventListener("change", () => { estado.ordem = ordemEl.value; estado.pag = 1; renderProdutos(); });
porPagEl.addEventListener("change", () => { estado.porPag = Number(porPagEl.value); estado.pag = 1; renderProdutos(); });

$("pager").addEventListener("click", (e) => {
  const b = e.target.closest("[data-pag]");
  if (!b || b.disabled) return;
  estado.pag = Number(b.dataset.pag);
  renderProdutos();
  $("catInfo").scrollIntoView({ behavior: semMovimento ? "auto" : "smooth", block: "center" });
});

// celular: os filtros abrem e fecham pelo botão "Filtros"
toggleBtn.addEventListener("click", () => {
  const aberto = lado.classList.toggle("open");
  toggleBtn.setAttribute("aria-expanded", String(aberto));
});

// ---------- Interações dos cards ----------
const mouseFino = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// inclinação 3D que segue o mouse, com um brilho por cima da foto
if (mouseFino && !semMovimento) {
  produtosEl.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".product");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;   // 0 a 1
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--rx", `${(0.5 - y) * 8}deg`);
    card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--gx", `${x * 100}%`);
    card.style.setProperty("--gy", `${y * 100}%`);
    card.classList.add("tilting");
  });
  produtosEl.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".product");
    if (card && !card.contains(e.relatedTarget)) {
      card.classList.remove("tilting");
      card.style.removeProperty("--rx");
      card.style.removeProperty("--ry");
    }
  });
}

// ao adicionar, uma bolinha "voa" do card até a barra do orçamento
function voar(card) {
  if (!card || semMovimento) return;
  const de = card.querySelector(".product-img").getBoundingClientRect();
  const alvo = barra.hidden ? null : $("quoteCount").getBoundingClientRect();
  const dot = document.createElement("span");
  dot.className = "fly-dot";
  dot.style.left = `${de.left + de.width / 2}px`;
  dot.style.top = `${de.top + de.height / 2}px`;
  document.body.appendChild(dot);
  // se a barra ainda não apareceu, mira no meio da parte de baixo da tela
  const tx = (alvo ? alvo.left + alvo.width / 2 : innerWidth / 2) - (de.left + de.width / 2);
  const ty = (alvo ? alvo.top + alvo.height / 2 : innerHeight - 40) - (de.top + de.height / 2);
  dot.animate(
    [
      { transform: "translate(-50%, -50%) scale(1)", opacity: 1 },
      { transform: `translate(calc(-50% + ${tx * 0.5}px), calc(-50% + ${ty * 0.5 - 80}px)) scale(1.2)`, opacity: 1, offset: 0.5 },
      { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(.4)`, opacity: 0.2 },
    ],
    { duration: 650, easing: "cubic-bezier(.5,0,.3,1)" }
  ).onfinish = () => dot.remove();
}

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
  document.body.classList.toggle("has-quote", total > 0);
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

// ---------- Menu do celular e rodapé (esta página não usa o main.js) ----------
const menuBtn = $("menuBtn");
const menuMobile = $("menuMobile");
if (menuBtn && menuMobile) {
  menuBtn.addEventListener("click", () => {
    const open = menuBtn.getAttribute("aria-expanded") === "true";
    menuBtn.setAttribute("aria-expanded", String(!open));
    menuMobile.classList.toggle("open", !open);
  });
}
if ($("year")) $("year").textContent = new Date().getFullYear();

// ---------- Início ----------
renderProdutos();
atualizarOrcamento(false);
})();
