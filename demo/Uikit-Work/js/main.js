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

      },
    ],
    nextButtonText: "Следующий вопрос",
    finishButtonText: "Закончить",
    restartButtonText: "Закрыть",
  }); 