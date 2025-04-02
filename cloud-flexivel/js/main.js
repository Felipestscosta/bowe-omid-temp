const btnOpenForm = document.querySelector(".btn-mobile")
const btnCloseForm = document.querySelector(".close-form")
const form = document.querySelector(".form")

btnOpenForm.addEventListener("click", (e) => {
    form.classList.add("open")
    btnOpenForm.style.display = "none"
})

btnCloseForm.addEventListener("click", (e) => {
    form.classList.remove("open")
    btnOpenForm.style.display = "block"
})

//-------------------------  Change select field colors -------------------------
function changeSelectColors() {
    const selects = Array.from(document.querySelectorAll("select"))
    const CSS_VARIABLES = getComputedStyle(document.documentElement)
    const placeholderColor = CSS_VARIABLES.getPropertyValue("--clr-placeholder")
    const fieldColor = CSS_VARIABLES.getPropertyValue("--clr-field")

    selects.forEach((select) => {
        select.style.color = placeholderColor

        select.addEventListener("change", (e) => {
            if (e.target.value === "" || e.target.value === "nulo") {
                select.style.color = placeholderColor
            } else {
                select.style.color = fieldColor
            }
        })
    })
}
changeSelectColors()

const swiper = new Swiper(".slidesSwiper", {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: {
        el: ".slides-pagination",
        clickable: true,
    },

    navigation: {
        nextEl: ".slides-button-next",
        prevEl: ".slides-button-prev",
    },
})
