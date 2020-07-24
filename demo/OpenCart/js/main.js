// Preloader
$( function() {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});

$(document).ready(function () {
  /* Продукты Табы */
  $(".choose-type__link li:first-child").addClass("active");
  $(".js-product-content").hide();
  $(".js-product-content:first").show();

  // Click function
  $(".choose-type__link li").click(function () {
    $(".choose-type__link li").removeClass("active");
    $(this).addClass("active");
    $(".js-product-content").hide();

    var activeTab = $(this).find("a").attr("href");
    $(activeTab).fadeIn();
    return false;
  });
});



/* Slider */
var mySwiper = new Swiper(".home-slider .swiper-container", {
  loop: true,
  effect: "fade",
  spaceBetween: 30,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper(".video .swiper-container", {
  slidesPerView: 2,
  spaceBetween: 50,
  loop: true,
  centeredSlides: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});