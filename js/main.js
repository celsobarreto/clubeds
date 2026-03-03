(function () {
  // Ano no footer
  document.querySelectorAll("[data-year]").forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Menu mobile
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-menu]");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // Form (versão estática): valida e redireciona
  const form = document.getElementById("formCadastro");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const errors = {};

      const nome = String(data.get("nome") || "").trim();
      const email = String(data.get("email") || "").trim();
      const nivel = String(data.get("nivel") || "").trim();
      const matricula = data.get("matricula") === "on";

      if (!nome) errors.nome = "Informe seu nome.";
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) errors.email = "Informe um e-mail válido.";
      if (!nivel) errors.nivel = "Selecione seu nível.";
      if (!matricula) errors.matricula = "Você precisa marcar a declaração de matrícula.";

      // limpar mensagens
      form.querySelectorAll("[data-error-for]").forEach(el => (el.textContent = ""));

      // exibir erros
      Object.keys(errors).forEach((key) => {
        const el = form.querySelector(`[data-error-for="${key}"]`);
        if (el) el.textContent = errors[key];
      });

      if (Object.keys(errors).length) return;

      // Aqui, se quiser, você pode salvar em LocalStorage/JSON.
      // Por enquanto, redireciona para página de obrigado.
      window.location.href = "obrigado.html";
    });
  }
})();