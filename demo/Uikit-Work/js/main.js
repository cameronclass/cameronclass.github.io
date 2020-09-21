$(function () {
  /* Preloader */
  var $preloader = $('#page-preloader'),
    $spinner = $preloader.find('.cssload-loader-inner');
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut('slow');

  /* Hamburger */
  /* $(".hamburger").click(function () {
    $(this).addClass("is-active");
  });
  $(".uk-offcanvas-overlay").before().click(function () {
    $(".hamburger").removeClass("is-active");
  }); */
});