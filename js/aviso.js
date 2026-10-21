// =========================================================
// Rei das Antenas | aviso de privacidade e cookies (todas as páginas)
// O site não usa cookies de rastreamento; o aviso só informa e some
// depois do "Entendi" (a escolha fica salva no próprio navegador).
// =========================================================
(() => {
  // ano do rodapé (as páginas de política não carregam o main.js)
  const ano = document.getElementById("year");
  if (ano && !ano.textContent) ano.textContent = new Date().getFullYear();

  // menu do celular nas páginas de política (as outras páginas já cuidam dele)
  const menuBtn = document.getElementById("menuBtn");
  if (document.body.classList.contains("page-legal") && menuBtn) {
    menuBtn.addEventListener("click", () => {
      const aberto = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!aberto));
      document.getElementById("menuMobile").classList.toggle("open", !aberto);
    });
  }

  const CHAVE = "rda-aviso";
  try { if (localStorage.getItem(CHAVE)) return; } catch (e) { /* sem armazenamento: mostra o aviso */ }

  const aviso = document.createElement("section");
  aviso.className = "aviso";
  aviso.setAttribute("aria-label", "Aviso de privacidade");
  aviso.innerHTML = `
    <p>Este site <strong>não usa cookies de rastreamento nem de publicidade</strong>. Guardamos no seu navegador só o necessário para ele funcionar, como a lista do orçamento. O mapa do Google só carrega se você pedir.
      <a href="privacidade.html#cookies">Ver a política de privacidade</a>.</p>
    <button type="button" class="btn btn-primary">Entendi</button>`;
  aviso.querySelector("button").addEventListener("click", () => {
    try { localStorage.setItem(CHAVE, "1"); } catch (e) { /* segue sem lembrar */ }
    aviso.remove();
  });
  document.body.appendChild(aviso);
})();
