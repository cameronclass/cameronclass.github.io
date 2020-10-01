// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");

  /* Header */

  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 5) {
      $(".header").addClass("header-fixed");
    } else {
      $(".header").removeClass("header-fixed");
    }
  });

  /* Menu Open */

  $(".header__logo_burger").click(function (e) {
    e.preventDefault();
    $(".header__bottom").addClass("menu-opened");
    $("html").addClass("lock");
  });
  $(".header__bottom_close").click(function (e) {
    e.preventDefault();
    $(".header__bottom").removeClass("menu-opened");
    $("html").removeClass("lock");
  });

  /* Tabs */
  $(".tabs__content").hide();
  $(".tabs__content:first").show();
  $(".tabs li:first").addClass("active");
  $(".tabs li").click(function (event) {
    event.preventDefault();
    $(".tabs li").removeClass("active");
    $(this).addClass("active");
    $(".tabs__content").hide();

    var selectTab = $(this).find("a").attr("href");

    $(selectTab).fadeIn();
  });
});

/* Slider */
var swiper = new Swiper(".home-catalog .swiper-container", {
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
});
