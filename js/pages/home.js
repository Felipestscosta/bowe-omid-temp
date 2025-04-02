document.getElementById("benefits--cards").onmousemove = (e) => {
  for (const card of document.getElementsByClassName("benefits--card")) {
    const rect = card.getBoundingClientRect(),
      x = e.clientX - rect.left,
      y = e.clientY - rect.top

    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }
}

const companiesSwiper01 = new Swiper(".companies-swiper-01", {
  spaceBetween: 24,
  slidesPerView: 2,
  speed: 4000,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  breakpoints: {
    600: {
      slidesPerView: 4,
    },

    1000: {
      slidesPerView: 6,
    },

    1200: {
      slidesPerView: 6,
      spaceBetween: 0,
    },
  },
})

const productSlides = Array.from(document.querySelectorAll("[data-product]"))

productSlides.forEach((product) => {
  const id = product.getAttribute("data-product")

  new Swiper(`.product-${id}-swiper`, {
    slidesPerView: 1,
    spaceBetween: 24,
    centeredSlides: false,
    loop: true,
    pagination: {
      el: `.product-${id}-pagination`,
      clickable: true,
    },
    navigation: {
      nextEl: `.product-${id}-button-next`,
      prevEl: `.product-${id}-button-prev`,
    },
  })
})
