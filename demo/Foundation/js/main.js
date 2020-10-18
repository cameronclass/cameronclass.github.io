var swiper = new Swiper(".slider .swiper-container", {
  /* cssMode: true, */
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: true,
  },
  navigation: {
    nextEl: ".slider .swiper-button-next",
    prevEl: ".slider .swiper-button-prev",
  },
  pagination: {
    el: ".slider .swiper-pagination",
  },
  clickable: true,
  keyboard: true,
});

$(function () {
  $(".header__mobile_open button").click(function () {
    $(".header__block").addClass("header__block_active");
    $("html").addClass("lock");
  });
  $(".header__mobile_close button").click(function () {
    $(".header__block").removeClass("header__block_active");
    $("html").removeClass("lock");
  });
});
