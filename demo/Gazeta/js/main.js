// Preloader
$(function () {
  var $preloader = $('#page-preloader'),
    $spinner = $preloader.find('.spinner');
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut('slow');
});

// One Page Scroll
$(document).ready(function () {
  $(".main").onepage_scroll({
    sectionContainer: ".scroll-section",
    responsiveFallback: 600,
    loop: false
  });
  $(".next-section").click(function () {
    $(".main").moveDown();
  });

});