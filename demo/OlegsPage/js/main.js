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
