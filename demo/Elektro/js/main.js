// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");
});

/* Jquery */
$(document).ready(function () {
  /* Fixed Menu */
  $(window)
    .resize(function () {
      if ($(window).width() < 1100) {
        $(".header-bottom").addClass("fixed-menu");
      } else {
        $(".header-bottom").removeClass("fixed-menu");
      }
    })
    .resize();

  $(window).scroll(function () {
    if ($(window).width() > 1100) {
      if ($(document).scrollTop() > 200) {
        $(".header-bottom").addClass("fixed-menu");
      } else {
        $(".header-bottom").removeClass("fixed-menu");
      }
    }
  });

  /* Продукты Табы */
  $(".product__link li:first-child").addClass("active");
  $(".js-product-content").hide();
  $(".js-product-content:first").show();

  // Click function
  $(".product__link li").click(function () {
    $(".product__link li").removeClass("active");
    $(this).addClass("active");
    $(".js-product-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });

  /* Size choose */
  $(".card__footer .size button").click(function () {
    $(this).toggleClass("active");
  });

  /* Insrese Value */

  $(".js-increase").on("click", function () {
    var $qty = $(this).closest(".number__controls").find(".js-counter-value");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal)) {
      $qty.val(currentVal + 1);
    }
  });

  $(".js-decrease").on("click", function () {
    var $qty = $(this).closest(".number__controls").find(".js-counter-value");
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal) && currentVal > 1) {
      $qty.val(currentVal - 1);
    }
  });
});

/* Swiper JS */
var swiper = new Swiper(".home-slider .swiper-container", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
});

var swiper = new Swiper(".brands .swiper-container", {
  slidesPerView: 6,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    1300: {
      slidesPerView: 6,
      spaceBetween: 60,
    },
    1025: {
      slidesPerView: 5,
      spaceBetween: 60,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});

var swiper = new Swiper(".watched-before .swiper-container", {
  slidesPerView: 5,
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
