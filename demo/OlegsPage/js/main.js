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

    if ($(".fixed-menu").hasClass("fixed-menu-active") && ($(window).scrollTop() > 250)) {
      $("div.fixed-menu").addClass("fixed-menu-active");
    } else {
      $("div.fixed-menu").toggleClass("fixed-menu-active");
    }
  });

  $(window).scroll(function () {
    if ($(window).scrollTop() > 250) {
      $(".header__logo").addClass("header__logo-active");
      $(".fixed-menu").addClass("fixed-menu-active");
    } else {
      $(".header__logo").removeClass("header__logo-active");
      $(".fixed-menu").removeClass("fixed-menu-active");
    }
  });

  // Click Pay
  $(".click_pay").click(function () {
    $(".buy-modal").toggleClass("buy-modal_active", 1000);
  });
  $(".modal-pay-close").click(function () {
    $(".buy-modal").removeClass("buy-modal_active");
  });

  $(".click_pay").click(function () {
    $("html").addClass("lock-2 lock-3");
    $("body").addClass("lock-2 lock-3");
  });
  $(".modal-pay-close").click(function () {
    if ($("html").hasClass("lock-3")) {
      $("html").removeClass("lock-3");
      $("body").removeClass("lock-3");
    } else {
      $("html").removeClass("lock-4");
      $("body").removeClass("lock-4");
    }
  });

  //click pay html
  $(".click_pay-html").click(function () {
    $("html").addClass("lock-4");
    $("body").addClass("lock-4");
  });
  $(".click_pay-html").click(function () {
    $(".buy-modal").toggleClass("buy-modal_active", 1000);
  });
});

$(document).ready(function ($) {
  $(".popup-open").click(function (e) {
    $(".popup-fade").addClass("popup-fade-active", 1000);
    $("html").addClass("lock-2");
    $("body").addClass("lock-2");
    e.preventDefault();
  });

  $(".popup-fade").click(function (e) {
    if ($(e.target).closest(".popup").length == 0) {
      $(".popup-fade").removeClass("popup-fade-active");
      $(".js-close-popup").removeClass("popup-fade-active");
      $("html").removeClass("lock-2");
      $("body").removeClass("lock-2");
    }
  });
});

// Slider

$(document).ready(function () {
  //initialize swiper when document ready
  var mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
});
