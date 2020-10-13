// Preloader
/* $( function() {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
}); */

var swiper = new Swiper(".slider .swiper-container", {
  /* cssMode: true, */
  loop: true,
  effect: "fade",
  navigation: {
    nextEl: ".slider .swiper-button-next",
    prevEl: ".slider .swiper-button-prev",
  },
  pagination: {
    el: ".slider .swiper-pagination",
  },
  clickable: true,
  keyboard: true,
});
