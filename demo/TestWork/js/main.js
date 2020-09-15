// Preloader
$(document).ready(function () {
  var count = 0;
  var counter = setInterval(function () {
    if (count < 100) {
      $('.page-preloader__count_number_span').text(count);
      count++
    } else {
      clearInterval(counter)
    };
    if (count > 50) {
      $('.page-preloader__count_icon').css("filter", "brightness(100)").css("mix-blend-mode", "hard-light");
    };
    if (count > 60) {
      $('.page-preloader__count').css("color", "white").css("mix-blend-mode", "hard-light");
      $('.page-preloader__count_block').css("color", "white").css("mix-blend-mode", "hard-light");
    }
  }, 30);

  setTimeout(function () {
    $(".page-preloader").fadeOut(500);
  }, 4500);
});