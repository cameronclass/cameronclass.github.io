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


var rellax = new Rellax('.rellax',{
  horizontal: true
});


if ($(window).width() > 960) {
  $('body').parallax({
    'elements': [{
      'selector': '.header__offer_btn a',
      'properties': {
        'x': {
          'right': {
            'initial': 0,
            'multiplier': 0.04,
            'unit': 'px',
            'invert': false
          }
        },
        'y': {
          'top': {
            'initial': 0,
            'multiplier': 0.1,
            'unit': 'px',
            'invert': true
          }
        }
      }
    }]
  });
}

$(window).scroll(function () {
  $('.first-layout__title, .first-layout__text, .first-layout__figures_oval, .first-layout__figures_spider, .first-layout__figures_contact').each(function () {
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
    if (imagePos < topOfWindow + 550) {
      $(this).addClass("swing-in-top-fwd");
    }
  });
});