// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");

  /* Header */
  /* $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      $("header").addClass("header-fixed");
    } else {
      $("header").removeClass("header-fixed");
    }
  }); */
  /* Hamburger */
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
    $(".header__menu").toggleClass("header__menu_active");
    $("html").toggleClass("lock");
  });
});
