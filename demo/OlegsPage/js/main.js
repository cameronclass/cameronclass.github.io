// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");
});

$(document).ready(function () {
  $(".js-hamburber-header").click(function () {
    $(".expand-menu").toggleClass("menu-opened");
    $(this).toggleClass("is-active");
    $("body").toggleClass("lock");

    if (
      $(".fixed-menu").hasClass("fixed-menu-active") &&
      $(window).scrollTop() > 250
    ) {
      $("div.fixed-menu").addClass("fixed-menu-active");
    } else {
      $("div.fixed-menu").toggleClass("fixed-menu-active");
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 470) {
      $(".js-hamburber-header").addClass("header__logo-active");
      $(".header__logo").addClass("header__logo-active");
      $(".fixed-menu").addClass("fixed-menu-active");
    } else {
      $(".js-hamburber-header").removeClass("header__logo-active");
      $(".header__logo").removeClass("header__logo-active");
      $(".fixed-menu").removeClass("fixed-menu-active");
    }
  });
});

// Slider

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper(".social__about", {
    // Optional parameters
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
  });
});

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper2 = new Swiper(".instructions-swiper", {
    // Optional parameters
    spaceBetween: 15,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var swiper3 = new Swiper(".catalog-slider", {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});

// Click Copy
var clipboard = new ClipboardJS(".js-copy");

clipboard.on("success", function (e) {
  $(e.trigger).text("Скопировано");
  $(e.trigger).addClass("is-copy");
});
