const botaoMenu = document.getElementById("botaoMenu");
const menuLinks = document.getElementById("menuLinks");
const brilhoMouse = document.getElementById("brilhoMouse");
const botaoTema = document.getElementById("botaoTema");
const botaoIdioma = document.getElementById("botaoIdioma");

const STORAGE_KEY = "portfolioIdioma";
const browserDefault = navigator.language.startsWith("en") ? "en" : "pt";
let idiomaAtual = localStorage.getItem(STORAGE_KEY) || browserDefault;

function setDocumentLang() {
  document.documentElement.lang = idiomaAtual === "pt" ? "pt-BR" : "en";
}

function setLanguageButtonText() {
  botaoIdioma.querySelector("span").textContent = idiomaAtual === "pt" ? "EN" : "PT";
}

function translatePage() {
  document.querySelectorAll("[data-pt][data-en]").forEach((elemento) => {
    const translation = elemento.dataset[idiomaAtual];
    if (!translation) return;

    const targetAttr = elemento.dataset.i18nAttr;
    if (targetAttr) {
      elemento.setAttribute(targetAttr, translation);
      return;
    }

    if (elemento.tagName === "TITLE") {
      document.title = translation;
      return;
    }

    if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA" || elemento.tagName === "SELECT") {
      elemento.placeholder = translation;
      return;
    }

    elemento.textContent = translation;
  });
}

function updateLanguage(novoIdioma) {
  idiomaAtual = novoIdioma;
  localStorage.setItem(STORAGE_KEY, idiomaAtual);
  translatePage();
  setLanguageButtonText();
  setDocumentLang();
}

botaoMenu.addEventListener("click", () => {
  menuLinks.classList.toggle("aberto");
});

document.querySelectorAll("#menuLinks a").forEach((link) => {
  link.addEventListener("click", () => {
    menuLinks.classList.remove("aberto");
  });
});

window.addEventListener("mousemove", (event) => {
  brilhoMouse.style.left = `${event.clientX}px`;
  brilhoMouse.style.top = `${event.clientY}px`;
});

botaoTema.addEventListener("click", () => {
  document.body.classList.toggle("tema-claro");

  const temaClaroAtivo = document.body.classList.contains("tema-claro");

  botaoTema.innerHTML = temaClaroAtivo
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';
});

botaoIdioma.addEventListener("click", () => {
  const novoIdioma = idiomaAtual === "pt" ? "en" : "pt";
  updateLanguage(novoIdioma);
});

window.addEventListener("DOMContentLoaded", () => {
  translatePage();
  setLanguageButtonText();
  setDocumentLang();
});

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach((entrada) => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("aparecer");
      observador.unobserve(entrada.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll(".animar").forEach((elemento) => {
  observador.observe(elemento);
});
