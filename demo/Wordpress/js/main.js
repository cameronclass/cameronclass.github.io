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

  $('a[href="#contact"]').click(function (event) {
    event.preventDefault();
    $("#modal").modal({
      fadeDuration: 250,
    });
  });
});


map = new ymaps.Map(id, {
  center: center,
  zoom: 13,
});
map.controls.remove("geolocationControl");
map.controls.remove("searchControl");
map.controls.remove("trafficControl");
map.controls.remove("typeSelector");
map.controls.remove("fullscreenControl");
map.controls.remove("rulerControl");
map.behaviors.disable(["scrollZoom"]);
