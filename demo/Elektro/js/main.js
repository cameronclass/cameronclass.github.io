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

  /* Footer nav */
  $(".footer__nav h5").click(function () {
    $(this).parent().find("ul").toggleClass("d-none");
  });

  $(window)
    .resize(function () {
      if ($(window).width() < 600) {
        $(".footer__nav ul").addClass("d-none");
      } else {
        $(".footer__nav ul").removeClass("d-none");
      }
    })
    .resize();

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

  /* Catalog Readmore */
  $(function () {
    $(".js-calatog-readmore").readmore({
      speed: 500,
      lessLink: '<div class="js-calatog-readmore-btn"><a href="#">Скрыть</a></div>',
      moreLink: '<div class="js-calatog-readmore-btn"><a href="#">Еще</a></div>',
      collapsedHeight: 76,
    });
  });

  /* Mobile Menu */
  $(".js-mobile-menu-open").click(function () {
    $(".header-mobile").addClass("mobile-open");
    $(".header-mobile__overlay").addClass("d-block");
    $("body").addClass("lock");
  });
  $(".header-mobile__overlay").click(function () {
    $(".header-mobile").removeClass("mobile-open");
    $(this).removeClass("d-block");
    $("body").removeClass("lock");
  });

  $(".js-menu-expand").click(function (e) {
    e.preventDefault();
    $(this)
      .parent()
      .find(".header-mobile__menu_detail")
      .addClass("menu-expand");
  });
  $(".js-menu-expand-close").click(function (e) {
    e.preventDefault();
    $(this)
      .parents()
      .find(".header-mobile__menu_detail")
      .removeClass("menu-expand");
  });

  $(".swiper-button-next").click( function(e){
    e.preventDefault();
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
      slidesPerView: 4,
      spaceBetween: 20,
    },
    720: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    320: {
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

  breakpoints: {
    1300: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    990: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    850: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    720: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  },
});

var swiper = new Swiper(".catalog-category-slider .swiper-container", {
  slidesPerView: 8,
  spaceBetween: 15,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1300: {
      slidesPerView: 8,
      spaceBetween: 15,
    },
    990: {
      slidesPerView: 6,
      spaceBetween: 15,
    },
    850: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    720: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  },
});