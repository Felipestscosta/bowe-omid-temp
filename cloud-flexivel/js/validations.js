const fieldNome = document.querySelector("input[name='nome']")
const fieldSobrenome = document.querySelector("input[name='Sobrenome']")
const fieldEmail = document.querySelector("input[name='email']")
const fieldTelefone = document.querySelector("input[name='telefone']")
const fieldCargo = document.querySelector("[data-field='cargo']")
const fieldFuncionarios = document.querySelector("[data-field='funcionarios']")
const fieldAssunto = document.querySelector("[data-field='assunto']")

const buttonSubmit = document.querySelector(".form-submit")

buttonSubmit.addEventListener("click", (e) => {
    if (fieldNome.value.trim() === "") {
        showPopUpValidation(e, fieldNome, "Informe seu nome")
    } else if (!validateSpecialCharacters(fieldNome)) {
        showPopUpValidation(e, fieldNome, "O campo permite apenas letras")
    } else if (fieldSobrenome.value.trim() === "") {
        showPopUpValidation(e, fieldSobrenome, "Informe seu sobrenome")
    } else if (!validateSpecialCharacters(fieldSobrenome)) {
        showPopUpValidation(e, fieldSobrenome, "O campo permite apenas letras")
    } else if (!validacaoEmail(fieldEmail.value.toLowerCase())) {
        showPopUpValidation(e, fieldEmail, "Informe seu e-mail")
    } else if (!emailCorporativo(fieldEmail.value.toLowerCase())) {
        showPopUpValidation(e, fieldEmail, "Informe um e-mail corporativo")
    } else if (fieldTelefone.value.length < 13) {
        showPopUpValidation(e, fieldTelefone, "Informe seu telefone")
    } else if (/^(\d\d)\d{0,10}\1$/.test(fieldTelefone.value.replace(/[^0-9]/g, "").substring(2))) {
        showPopUpValidation(e, fieldTelefone, "Informe um telefone válido")
    } else if (fieldCargo.value === "") {
        showPopUpValidation(e, fieldCargo, "Informe seu cargo")
    } else if (fieldAssunto.value === "") {
        showPopUpValidation(e, fieldAssunto, "Informe sobre o que você deseja conversar")
    } else if (fieldFuncionarios.value === "") {
        showPopUpValidation(e, fieldFuncionarios, "Informe o número de funcionários da empresa")
    } else {
        const data = []

        data.push(
            { name: "identificador", value: "lp-cloud-flexivel" },
            {
                name: "token_rdstation",
                value: "c3ca5d242d10d9df55e6e4bf2736de8d",
            },
            { name: "privacy_data[communications]", value: "1" },
            {
                name: "form_url",
                value: location.href,
            }
        )

        const fields = document.querySelectorAll("[data-field]")
        fields.forEach((field) => {
            data.push({ name: field.name, value: field.value })
        })

        RdIntegration.post(data)

        buttonSubmit.style.pointerEvents = "none"
        buttonSubmit.textContent = "Enviando..."

        setTimeout(() => {
            window.location.href = "https://www.omidsolutions.com/obrigado-contato"
        }, 1500)

        return true
    }
})

// Swal fire popup
function showPopUpValidation(event, field, message) {
    Swal.fire({
        icon: "warning",
        text: message,
        timer: 2500,
        onAfterClose: () => {
            field.focus()
        },
    })

    event.preventDefault()
}

//Email validations
function validacaoEmail(email) {
    var verifica =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return verifica.test(String(email).toLowerCase())
}

function emailCorporativo(email) {
    const invalidDomains = [
        "@gmail.",
        "@yahoo.",
        "@hotmail.",
        "@live.",
        "@aol.",
        "@outlook.",
        "@terra.",
        "@bol.",
        "@uol.",
    ]

    for (let i = 0; i < invalidDomains.length; i++) {
        const domain = invalidDomains[i]
        if (email.indexOf(domain) != -1) {
            return false
        }
    }
    return true
}

setTimeout(function () {
    document.querySelector("input[name='url_pagina']").value =
        location.protocol + "//" + location.host + location.pathname
}, 2000)

// Query Form
function queryForm(settings) {
    const reset = settings && settings.reset ? settings.reset : false
    const self = window.location.toString()
    const querystring = self.split("?")
    if (querystring.length > 1) {
        const pairs = querystring[1].split("&")
        for (i in pairs) {
            var keyval = pairs[i].split("=")
            if (reset || sessionStorage.getItem(keyval[0]) === null) {
                sessionStorage.setItem(keyval[0], decodeURIComponent(keyval[1]))
            }
        }
    }
    const hiddenFields = Array.from(document.querySelectorAll("input[type='hidden'], input[type='text']"))
    for (let i = 0; i < hiddenFields.length; i++) {
        const param = sessionStorage.getItem(hiddenFields[i].name)

        if (param) {
            document.getElementsByName(hiddenFields[i].name)[0].value = param
        }
    }
}

setTimeout(() => {
    queryForm()
}, 2000)

// Phone Mask
fieldTelefone.addEventListener("input", handlePhoneInput, false)

function handlePhoneInput(e) {
    e.target.value = phoneMask(e.target.value)
}

function phoneMask(phone) {
    return phone
        .replace(/\D/g, "")
        .replace(/^(\d)/, "($1")
        .replace(/^(\(\d{2})(\d)/, "$1) $2")
        .replace(/(\d{5})(\d{1,4})/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1")
}

// Simulate Enter click
document.querySelectorAll("[data-field]").forEach((field) => {
    field.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.keyCode === 13) {
            buttonSubmit.click()
        }
    })
})

function validateSpecialCharacters(field) {
    if (!/^[a-záàâãéèêíïóôõöúçñ ]+$/i.test(field.value)) {
        return false
    } else {
        return true
    }
}

fieldNome.addEventListener("keydown", function (event) {
    const key = event.key
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/

    if (!regex.test(key)) {
        event.preventDefault()
    }
})

fieldSobrenome.addEventListener("keydown", function (event) {
    const key = event.key
    const regex = /^[a-zA-ZÀ-ÿ\s]+$/

    if (!regex.test(key)) {
        event.preventDefault()
    }
})
