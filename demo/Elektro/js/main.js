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

  

  /* Mobile Search Button mobile-search__overlay*/
  $(".js-mobile-search-open").click(function (e) {
    e.preventDefault();
    $(".mobile-search__wrapper").addClass("top-0");
    $(".mobile-search__block").addClass("top-0");
    $("body").addClass("lock");
    $("#js-focus").focus();
  });

  $(".js-mobile-search-close").click(function (e) {
    e.preventDefault();
    $(".mobile-search__wrapper").removeClass("top-0");
    $(".mobile-search__block").removeClass("top-0");
    $("body").removeClass("lock");
  });
  $(".mobile-search__overlay").click(function (e) {
    e.preventDefault();
    $(".mobile-search__wrapper").removeClass("top-0");
    $(".mobile-search__block").removeClass("top-0");
    $("body").removeClass("lock");
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
    $(".catalog-page__filter_block").addClass("catalog-page__filter_block_active");
    $(".catalog-page__filter_bitrix").addClass("catalog-page__filter_bitrix_active");
    $(".catalog-page__filter_overlay").addClass("catalog-page__filter_overlay_active");
    $("body").addClass("lock");
  });

  $(".catalog-page__filter_overlay").click(function () {
    $(".catalog-page__filter_block").removeClass("catalog-page__filter_block_active");
    $(".catalog-page__filter_bitrix").removeClass("catalog-page__filter_bitrix_active");
    $(".catalog-page__filter_overlay").removeClass("catalog-page__filter_overlay_active");
    $("body").removeClass("lock");
  });
  $(".bx_filter_parameters_box_title").after().click(function () {
    $(".catalog-page__filter_block").removeClass("catalog-page__filter_block_active");
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

  $(function () {
    $('.js-category-catalog-more').readmore({
      speed: 500,
      lessLink: '<div class="js-category-catalog-more-btn close"><a href="#">Свернуть</a></div>',
      moreLink: '<div class="js-category-catalog-more-btn"><a href="#">Показать все</a></div>',
      collapsedHeight: 247,
    });
  });
  /* js-category-catalog-more */

  /* Modal js-modal-phone-call js-modal-text*/
  $("#modal-call").click(function (e) {
    e.preventDefault();
    $("#js-modal-phone-call").fadeIn("fast");
    $("body").addClass("lock")
  });

  $("#modal-text").click(function (e) {
    e.preventDefault();
    $("#js-modal-text").fadeIn("fast");
    $("body").addClass("lock")
  });

  $(".modal__overlay").click(function (e) {
    e.preventDefault();
    $(".modal").fadeOut("fast");
    $("body").removeClass("lock")
  });
  $(".modal__content_title .close").click(function (e) {
    e.preventDefault();
    $(".modal").fadeOut("fast");
    $("body").removeClass("lock")
  });


  /* ionRangeSlider */
  $(".js-range-slider").ionRangeSlider();

  /* Scroll to top */
  $(".js-to-top").click(function (e) {
    $("html, body").animate({
      scrollTop: 0
    }, 600);
  });
  $(window).scroll(function () {
    if ($(document).scrollTop() > 1000) {
      $(".js-to-top").fadeIn();
    } else {
      $(".js-to-top").fadeOut();
    }
  });

  /* Hover Open Catalog js-mobile-menu-open*/

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

/* Compare bottom */
var swiper = new Swiper('.compare__bottom .swiper-container', {
  direction: 'horizontal',
  slidesPerView: 'auto',
  freeMode: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
  /* mousewheel: true, */
});


/* PLEASE DO NOT COPY AND PASTE THIS CODE. */
(function () {
  var w = window,
    C = '___grecaptcha_cfg',
    cfg = w[C] = w[C] || {},
    N = 'grecaptcha';
  var gr = w[N] = w[N] || {};
  gr.ready = gr.ready || function (f) {
    (cfg['fns'] = cfg['fns'] || []).push(f);
  };
  (cfg['render'] = cfg['render'] || []).push('onload');
  w['__google_recaptcha_client'] = true;
  var d = document,
    po = d.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  po.src = 'https://www.gstatic.com/recaptcha/releases/QVh-Tz10ahidjrORgXOS1oB0/recaptcha__ru.js';
  var e = d.querySelector('script[nonce]'),
    n = e && (e['nonce'] || e.getAttribute('nonce'));
  if (n) {
    po.setAttribute('nonce', n);
  }
  var s = d.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
})();