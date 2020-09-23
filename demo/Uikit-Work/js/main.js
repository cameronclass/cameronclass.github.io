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


/* $(".universitet-tabs__video").scrollTop(function () {
  if ($(".universitet-tabs__video").scrollTop() + $(".universitet-tabs__video").height() == $(".universitet-tabs__video").height()) {
    alert("bottom!");
  }
}); */
$(".universitet-tabs__video").scroll(function () {
  var scroll = $(".universitet-tabs__video").scrollTop() == $(".universitet-tabs__video").height();

  if (scroll >= 500) {
    $(".universitet-tabs__video").addClass("darkHeader");
  } else {
    $(".universitet-tabs__video").removeClass("darkHeader");
  }
});


/* Tests */
/*  */
$('#quiz').quiz({
  counterFormat: 'Вопрос %current из %total',
  resultsFormat: "<img src=img/finish-quiz.png>Поздравляем! Вы заработали %score Баллов. <br> Следите за турнирной таблицей!",
  questions: [{
      'q': 'A smaple question?',
      'options': [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4'
      ],
      'correctIndex': 1,
    },
    {
      'q': 'A smaple question?',
      'options': [
        'Answer 1',
        'Answer 2'
      ],
      'correctIndex': 1,

    },
    {
      'q': 'A smaple question?',
      'options': [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4'
      ],
      'correctIndex': 2,

    },
    {
      'q': 'A smaple question?',
      'options': [
        'Answer 1',
        'Answer 2'
      ],
      'correctIndex': 1,

    },
    {
      'q': 'A smaple question?',
      'options': [
        'Answer 1',
        'Answer 2',
        'Answer 3',
        'Answer 4'
      ],
      'correctIndex': 3,
      'timer': 30
    },
  ],
  nextButtonText: "Следующий вопрос",
  finishButtonText: "Закончить",
  restartButtonText: "Закрыть",
});



