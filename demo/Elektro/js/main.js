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
      if ($(window).width() < 1025) {
        $(".header-bottom").addClass("fixed-menu");
      } else {
        $(".header-bottom").removeClass("fixed-menu");
      }
    })
    .resize();

  $(window).scroll(function () {
    if ($(window).width() > 1025) {
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

  /* Filter Mobile */

  $(".sort-button-mobile").click(function () {
    $(".catalog-page__filter").addClass("catalog-page__filter_active");
    $(".catalog-page__filter_bitrix").addClass("catalog-page__filter_bitrix_active");
    $(".catalog-page__filter_overlay").addClass("catalog-page__filter_overlay_active");
    $("body").addClass("lock");
  });

  $(".catalog-page__filter_overlay").click(function () {
    $(".catalog-page__filter").removeClass("catalog-page__filter_active");
    $(".catalog-page__filter_bitrix").removeClass("catalog-page__filter_bitrix_active");
    $(".catalog-page__filter_overlay").removeClass("catalog-page__filter_overlay_active");
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

  $(".swiper-button-next").click(function (e) {
    e.preventDefault();
  });

  /* Table Product More js-table-product-more*/
  $(".js-table-product-more").click(function (e) {
    e.preventDefault();
    $(this)
      .parent()
      .find(".table-product tbody")
      .toggleClass("h-auto");
    $(this).toggleClass("table-product__more_active")
  });

  /* js-add-to-checkout */
  $(".js-add-to-checkout").click(function (e) {
    /* e.preventDefault(); */
    $(this)
      .parent()
      .find(".number__controls")
      .addClass("d-none");
    $(this).addClass("added-to-checkout");
    $(this).children().text("В корзине");

  });

  /* js-product-share */

  $(".js-product-share").click(function (e) {
    /* e.preventDefault(); */
    $(this)
      .parent()
      .find(".social")
      .toggleClass("d-flex");

  });

  /* Readmore */
  $(function () {
    $('.js-product-detail-more').readmore({
      speed: 500,
      lessLink: '<a href="#" class="btn-border btn-more"><span class="i-refresh-green icon-margin"></span><span>Свернуть</span></a>',
      moreLink: '<a href="#" class="btn-border btn-more"><span class="i-refresh-green icon-margin"></span><span>Показать еще</span></a>',
      collapsedHeight: 270,
    });
  });

  $(function () {
    $('.js-category-readmore').readmore({
      speed: 500,
      lessLink: '<div class="js-category-readmore-btn close"><a href="#">Свернуть</a></div>',
      moreLink: '<div class="js-category-readmore-btn"><a href="#">Показать еще</a></div>',
      collapsedHeight: 115,
    });
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
    300: {
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
    /*  1025: {
       slidesPerView: 5,
       spaceBetween: 15,
     }, */
    990: {
      slidesPerView: 5,
      spaceBetween: 15,
    },
    850: {
      slidesPerView: 4,
      spaceBetween: 15,
    },
    720: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    460: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
    300: {
      slidesPerView: 1,
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
    1200: {
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
    460: {
      slidesPerView: 3,
      spaceBetween: 15,
    },
    300: {
      slidesPerView: 2,
      spaceBetween: 5,
    },
  },
});


/* Product card gallery */
var galleryThumbs = new Swiper('.product__gallery .gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 3,
  freeMode: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
});
var galleryTop = new Swiper('.product__gallery .gallery-top', {
  spaceBetween: 10,
  /* effect: 'fade', */
  /*  navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   }, */
  thumbs: {
    swiper: galleryThumbs
  }
});