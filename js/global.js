/* Header open/close logic */
const headerButton = document.querySelector("[data-header-openner]")
const headerMenu = document.querySelector("[data-header-menu]")
const headerLinks = Array.from(
  document.querySelectorAll("[data-header-menu] a")
)

function closeHeader() {
  if (!headerButton || !headerMenu) return

  headerMenu.classList.remove("active")
  headerButton.classList.remove("active")

  document.body.style.overflow = "unset"
}

if (headerLinks && headerLinks.length > 0) {
  headerLinks.forEach((a) => {
    a.addEventListener("click", closeHeader)
  })
}

if (headerButton && headerMenu) {
  headerButton.addEventListener("click", (e) => {
    if (headerMenu.classList.contains("active")) {
      headerMenu.classList.remove("active")
      headerButton.classList.remove("active")
      document.body.style.overflow = "unset"
    } else {
      headerMenu.classList.add("active")
      headerButton.classList.add("active")
      document.body.style.overflow = "hidden"
    }
  })
}

const hasSublists = Array.from(document.querySelectorAll("[data-has-sublist]"))

if (hasSublists && hasSublists.length > 0) {
  hasSublists.forEach((a) => {
    const sublist = a.nextElementSibling
    const links = sublist.querySelectorAll("a")

    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        sublist.classList.remove("active")
      })
    )

    a.addEventListener("mouseover", (e) => {
      sublist.classList.add("active")
    })

    sublist.addEventListener("mouseover", (e) => {
      sublist.classList.add("active")
    })

    a.addEventListener("mouseleave", (e) => {
      sublist.classList.remove("active")
    })

    sublist.addEventListener("mouseleave", (e) => {
      sublist.classList.remove("active")
    })
  })
}

// UTMS
function getUTMsFromURL() {
  const urlParams = new URLSearchParams(window.location.search)
  console.log(urlParams)

  return {
    utm_source: urlParams.get("utm_source") || "",
    utm_term: urlParams.get("utm_term") || "",
    utm_medium: urlParams.get("utm_medium") || "",
    utm_content: urlParams.get("utm_content") || "",
    utm_campaign: urlParams.get("utm_campaign") || "",
  }
}

function populateFormWithUTMs(utms) {
  document.querySelector('input[name="cf_utm_source"]').value = utms.utm_source
  document.querySelector('input[name="cf_utm_term"]').value = utms.utm_term
  document.querySelector('input[name="cf_utm_medium"]').value = utms.utm_medium
  document.querySelector('input[name="cf_utm_content"]').value =
    utms.utm_content
  document.querySelector('input[name="cf_utm_campaign"]').value =
    utms.utm_campaign
}

function saveUTMsToSession(utms) {
  sessionStorage.setItem("utm_source", utms.utm_source)
  sessionStorage.setItem("utm_term", utms.utm_term)
  sessionStorage.setItem("utm_medium", utms.utm_medium)
  sessionStorage.setItem("utm_content", utms.utm_content)
  sessionStorage.setItem("utm_campaign", utms.utm_campaign)
}

function getUTMsFromSession() {
  return {
    utm_source: sessionStorage.getItem("utm_source") || "",
    utm_term: sessionStorage.getItem("utm_term") || "",
    utm_medium: sessionStorage.getItem("utm_medium") || "",
    utm_content: sessionStorage.getItem("utm_content") || "",
    utm_campaign: sessionStorage.getItem("utm_campaign") || "",
  }
}

function hasUTMsInSession() {
  return sessionStorage.getItem("utm_source") !== null
}

const interval = setInterval(function () {
  const form = document.querySelector("#conversion-form-site_hr")
  console.log(form)

  if (form) {
    clearInterval(interval)

    if (hasUTMsInSession()) {
      const utms = getUTMsFromSession()
      populateFormWithUTMs(utms)
    } else {
      const utms = getUTMsFromURL()
      saveUTMsToSession(utms)
      populateFormWithUTMs(utms)
    }

    const urlPage = document.querySelector("input[name='cf_url_pagina']")
    if (urlPage) {
      urlPage.value = window.location.href
    }
  }
}, 500)

// Função para calcular o tempo de leitura
function calcularTempoDeLeitura() {
  // Seleciona o conteúdo da tag .post-content
  const postContent = document.querySelector('.post-content');

  if (!postContent) {
      console.log('A tag .post-content não foi encontrada.');
      return;
  }

  // Obtém o texto da tag .post-content
  const text = postContent.innerText || postContent.textContent;

  // Conta o número de palavras no texto
  const wordCount = text.trim().split(/\s+/).length;

  // Estima o tempo de leitura com base em 200 palavras por minuto
  const wordsPerMinute = 200;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Define o texto "minuto" ou "minutos" de acordo com o valor de readingTime
  const readingText = readingTime === 1 ? 'minuto' : 'minutos';

  // Exibe a estimativa de tempo de leitura na tag .tempo-leitura
  const readingTimeElement = document.querySelector('.tempo-leitura');
  if (readingTimeElement) {
      readingTimeElement.textContent = `Tempo estimado de leitura: ${readingTime} ${readingText}`;
  } else {
      console.log('A tag .tempo-leitura não foi encontrada.');
  }
}

// Executa a função ao carregar a página
window.onload = calcularTempoDeLeitura;