// =========================================================
// Rei das Antenas | interações da landing page
// =========================================================

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const WHATSAPP = "5519974094897";

document.getElementById("year").textContent = new Date().getFullYear();

// ---------- Menu do celular ----------
const menuBtn = document.getElementById("menuBtn");
const menuMobile = document.getElementById("menuMobile");

menuBtn.addEventListener("click", () => {
  const open = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!open));
  menuMobile.classList.toggle("open", !open);
});
menuMobile.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    menuBtn.setAttribute("aria-expanded", "false");
    menuMobile.classList.remove("open");
  })
);

// ---------- Medidor de sinal do topo (único momento animado ao abrir) ----------
const signal = document.querySelector(".signal");
const meterValue = document.getElementById("meterValue");
const meterStatus = document.getElementById("meterStatus");
const bars = document.querySelectorAll(".bars i");
const FINAL = 98;

function setMeter(value) {
  meterValue.textContent = `${value}%`;
  bars.forEach((bar, i) => bar.classList.toggle("lit", value >= (i + 1) * 19));
}

function tune() {
  signal.classList.add("on");
  if (reduceMotion) {
    setMeter(FINAL);
    meterStatus.textContent = "Sinal excelente";
    meterStatus.classList.add("ok");
    return;
  }
  // sobe com um pequeno "tremido", como o ajuste de uma antena
  const start = performance.now();
  const duration = 1600;
  const timer = setInterval(() => {
    const t = Math.min((performance.now() - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const jitter = t < 1 ? Math.round((Math.random() - 0.5) * 8) : 0;
    setMeter(Math.max(0, Math.min(FINAL, Math.round(eased * FINAL) + jitter)));
    if (t >= 1) {
      clearInterval(timer);
      setMeter(FINAL);
      meterStatus.textContent = "Sinal excelente";
      meterStatus.classList.add("ok");
      fluctuate();
    }
  }, 50);
}

// depois de sintonizar, o sinal fica oscilando entre 98% e 100%
function fluctuate() {
  const steps = [99, 100, 99, 98, 100, 99, 98];
  let i = 0;
  setInterval(() => {
    setMeter(steps[i % steps.length]);
    meterValue.classList.remove("tick");
    void meterValue.offsetWidth;            // reinicia a animação do número
    meterValue.classList.add("tick");
    i++;
  }, 1400);
}
// com a abertura tocando, o medidor só sintoniza depois que a tela se abre
const introOn = document.documentElement.classList.contains("js-intro");
setTimeout(tune, introOn ? 2900 : 300);

// tira a abertura da página quando ela termina
const intro = document.getElementById("intro");
if (intro) {
  if (!introOn) intro.remove();
  else setTimeout(() => intro.remove(), 3500);
}

// ---------- Cards de serviço que abrem ----------
document.querySelectorAll(".service").forEach((card) => {
  const toggle = card.querySelector(".service-toggle");
  toggle.addEventListener("click", () => {
    const open = card.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
});

// cada card abre o WhatsApp já com o nome do serviço na mensagem
document.querySelectorAll(".service-cta").forEach((link) => {
  const text = `Olá! Vim pelo site e gostaria de um orçamento de ${link.dataset.service}.`;
  link.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
  link.target = "_blank";
  link.rel = "noopener";
});

// ---------- Trabalhos: vídeos curtos nos cards, completos ao tocar (todos sem som) ----------
const reelsList = document.getElementById("reels");
const reelVideos = [...reelsList.querySelectorAll("video")];
const canHover = window.matchMedia("(hover: hover)").matches;

// barrinha de progresso de cada vídeo
reelVideos.forEach((video) => {
  const bar = document.createElement("span");
  bar.className = "reel-progress";
  video.parentElement.appendChild(bar);
  video.addEventListener("timeupdate", () => bar.style.setProperty("--p", video.duration ? video.currentTime / video.duration : 0));
});

const play = (v) => { if (!reduceMotion) v.play().catch(() => {}); };

if (canHover) {
  // computador: o vídeo de destaque roda ao aparecer, os outros quando o mouse passa
  const feature = reelsList.querySelector(".reel-feature video");
  new IntersectionObserver(([entry]) => (entry.isIntersecting ? play(feature) : feature.pause()), { threshold: 0.5 }).observe(feature);
  reelVideos.filter((v) => v !== feature).forEach((video) => {
    const btn = video.parentElement;
    btn.addEventListener("mouseenter", () => play(video));
    btn.addEventListener("mouseleave", () => video.pause());
  });
} else {
  // celular: roda só o vídeo que está bem visível na faixa, para poupar dados
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => (entry.intersectionRatio > 0.75 ? play(entry.target) : entry.target.pause()));
  }, { threshold: [0, 0.75, 1] });
  reelVideos.forEach((v) => io.observe(v));
}

// ---------- Faixa deslizante: setas, bolinhas e arrastar com o mouse ----------
const setas = [...document.querySelectorAll(".reels-arrow")];
const dotsEl = document.getElementById("reelsDots");
const reels = [...reelsList.querySelectorAll(".reel")];
const suave = reduceMotion ? "auto" : "smooth";

// quantos vídeos cabem inteiros e quantas "páginas" a faixa tem
function medidas() {
  const passo = reels[1].offsetLeft - reels[0].offsetLeft;   // largura do card + espaço
  const porVez = Math.max(1, Math.round((reelsList.clientWidth + (passo - reels[0].offsetWidth)) / passo));
  return { passo, porVez, paginas: Math.ceil(reels.length / porVez) };
}

function irPara(pagina) {
  const { passo, porVez, paginas } = medidas();
  const p = Math.min(Math.max(pagina, 0), paginas - 1);
  reelsList.scrollTo({ left: p * porVez * passo, behavior: suave });
}

function paginaAtual() {
  const { passo, porVez } = medidas();
  const max = reelsList.scrollWidth - reelsList.clientWidth;
  if (reelsList.scrollLeft >= max - 4) return Math.ceil(reels.length / porVez) - 1;   // fim da faixa
  return Math.round(reelsList.scrollLeft / (passo * porVez));
}

function montarBolinhas() {
  const { paginas } = medidas();
  dotsEl.innerHTML = paginas > 1
    ? Array.from({ length: paginas }, (_, i) => `<button type="button" data-pag="${i}" aria-label="Vídeos, parte ${i + 1} de ${paginas}"></button>`).join("")
    : "";
  atualizarFaixa();
}

function atualizarFaixa() {
  const atual = paginaAtual();
  const max = reelsList.scrollWidth - reelsList.clientWidth;
  setas[0].disabled = reelsList.scrollLeft <= 4;
  setas[1].disabled = reelsList.scrollLeft >= max - 4;
  dotsEl.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-current", String(i === atual)));
}

setas.forEach((btn) => btn.addEventListener("click", () => irPara(paginaAtual() + Number(btn.dataset.dir))));
dotsEl.addEventListener("click", (e) => {
  const b = e.target.closest("[data-pag]");
  if (b) irPara(Number(b.dataset.pag));
});

let rolagem;
reelsList.addEventListener("scroll", () => {
  cancelAnimationFrame(rolagem);
  rolagem = requestAnimationFrame(atualizarFaixa);
}, { passive: true });

let medidaTimer;
window.addEventListener("resize", () => {
  clearTimeout(medidaTimer);
  medidaTimer = setTimeout(montarBolinhas, 150);
});
montarBolinhas();

// computador: arrastar a faixa com o mouse (no celular o dedo já desliza sozinho)
let arraste = null;
reelsList.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "mouse" || e.button !== 0) return;
  arraste = { x: e.clientX, inicio: reelsList.scrollLeft, moveu: false };
});
window.addEventListener("pointermove", (e) => {
  if (!arraste) return;
  const dx = e.clientX - arraste.x;
  if (!arraste.moveu && Math.abs(dx) < 6) return;   // abaixo disso é clique, não arraste
  arraste.moveu = true;
  reelsList.classList.add("arrastando");
  reelsList.scrollLeft = arraste.inicio - dx;
});
window.addEventListener("pointerup", () => {
  if (!arraste) return;
  const moveu = arraste.moveu;
  arraste = null;
  if (!moveu) return;
  reelsList.classList.remove("arrastando");
  // encaixa no vídeo mais próximo e não deixa o arraste virar clique
  const { passo } = medidas();
  reelsList.scrollTo({ left: Math.round(reelsList.scrollLeft / passo) * passo, behavior: suave });
  ignorarClique = true;
  setTimeout(() => { ignorarClique = false; }, 0);
});
let ignorarClique = false;
reelsList.addEventListener("click", (e) => {
  if (ignorarClique) { e.stopPropagation(); e.preventDefault(); }
}, true);
reelsList.addEventListener("dragstart", (e) => e.preventDefault());   // impede arrastar a imagem/vídeo

// player em tela cheia
const player = document.getElementById("player");
const playerVideo = document.getElementById("playerVideo");
reelsList.querySelectorAll(".reel-btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    reelVideos.forEach((v) => v.pause());
    playerVideo.src = btn.dataset.src;
    player.classList.toggle("wide", btn.hasAttribute("data-wide"));   // vídeo deitado
    player.setAttribute("aria-label", btn.dataset.title);
    player.showModal();
    playerVideo.play().catch(() => {});
  })
);
document.getElementById("playerClose").addEventListener("click", () => player.close());
player.addEventListener("click", (e) => { if (e.target === player) player.close(); });   // clique fora do vídeo
player.addEventListener("close", () => { playerVideo.pause(); playerVideo.removeAttribute("src"); playerVideo.load(); });

// ---------- Entrada em cascata ao rolar ----------
const revealEls = document.querySelectorAll("[data-reveal]");
revealEls.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
  el.style.setProperty("--d", `${siblings.indexOf(el) * 0.08}s`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    // na faixa de vídeos, os cards fora da tela aparecem junto, senão chegariam em branco ao deslizar
    const grupo = entry.target.closest("#reels") ? reels : [entry.target];
    grupo.forEach((el) => { el.classList.add("visible"); observer.unobserve(el); });
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

revealEls.forEach((el) => observer.observe(el));
