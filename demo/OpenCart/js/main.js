// Preloader
$( function() {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
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