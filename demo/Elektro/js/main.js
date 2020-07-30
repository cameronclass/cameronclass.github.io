// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");
});

/* Jquery */
$(document).ready(function () {
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

  $('.js-increase').on('click', function () {
    var $qty = $(this).closest('.number__controls').find('.js-counter-value');
    var currentVal = parseInt($qty.val());
    if (!isNaN(currentVal)) {
      $qty.val(currentVal + 1);
    }
  });

  $('.js-decrease').on('click', function () {
    var $qty = $(this).closest('.number__controls').find('.js-counter-value');
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
