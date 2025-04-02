const infraSwiper = new Swiper(".infraSwiper", {
  spaceBetween: 20,
  slidesPerView: 1.2,
  speed: 10000,
  loop: true,
  centeredSlides: false,
  autoplay: {
    delay: 0,
    disableOnInteraction: true,
  },
  breakpoints: {
    600: {
      slidesPerView: "auto",
    },
    1000: {
      slidesPerView: "auto",
      centeredSlides: false,
    },
  },
})

document.body.style.overflowX = "unset"
