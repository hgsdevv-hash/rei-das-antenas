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

// ---------- Entrada em cascata ao rolar ----------
const revealEls = document.querySelectorAll("[data-reveal]");
revealEls.forEach((el) => {
  const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal"));
  el.style.setProperty("--d", `${siblings.indexOf(el) * 0.08}s`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

revealEls.forEach((el) => observer.observe(el));
