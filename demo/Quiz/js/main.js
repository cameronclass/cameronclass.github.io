var intervals = [];
var game = {
  // state and jquery selectors
  state: {
    startButton: $(".start-button"),
    resetGame: $(".reset-button"),
    gameContainer: $(".game"),
    scoreNumber: $(".score-number"),
    questionsView: $(".questions"),
    gameEndView: $(".game-end"),
    gameEndViewTimesUp: $(".game-end-times-up"),
    gameEndText: $(".game-end-text"),
    timeOutText: $(".time-out-text"),
    gauge: $(".gauge"),
    questions: $(".question"),
    answers: $(".answer"),
    timer: $(".timer"),
    indicators: $(".indicator"),
    numberOfQuestions: $(".question").length,
    questionsAnswered: 0,
    correctAnswers: 0,
    time_count: 500,
    time_count_update: 500

  },

  init: function () {
    game.registerEventHandlers();
  },

  registerEventHandlers: function () {
    game.state.answers.on("click touch", function (e) {
      //e.preventDefault();
      game.checkAnswer($(this));

    });

    game.state.startButton.on("click touch", function (e) {
      e.preventDefault();
      game.start();
    });
        game.state.resetGame.on("click touch", function (e) {
          e.preventDefault();
          game.start();
        });
  },

  start: function () {
    game.state.gameContainer.addClass("show");
    $("html, body").animate({
        scrollTop: game.state.gameContainer.offset().top - 10
      },
      400,
      
      game.startTimer()
    );
    game.state.startButton.unbind("click touch");
    game.state.resetGame.unbind("click touch");

  },

  startTimer: function () {
    var zeroFill = function (units) {
      return units < 10 ? "0" + units + "" : units;
    };
    var count = 0;


    var interval = window.setInterval(function () {
      var centisecondsRemaining = game.state.time_count - count;
      var min = Math.floor(centisecondsRemaining / 100 / 60);
      var sec = zeroFill(Math.floor(centisecondsRemaining / 100 % 60));
      game.state.timer.text(min + ":" + sec);
      count++;
      if (centisecondsRemaining === 0) {
        clearInterval(interval);
        //game.endGame();
        game.timesUp();
      }
      if (game.state.questionsAnswered === game.state.numberOfQuestions) {
        clearInterval(interval);
      }
      if (game.state.questionsAnswered === game.state.numberOfQuestions) {
        clearInterval(interval);
      }

    }, 10);
    intervals.push(interval);
  },

  checkAnswer: function (answer) {
    if (answer.data("correct")) {
      game.state.correctAnswers++;
      game.drawGaugeValue();
      game.updateProgress(true);
      game.giveAnswerFeedback(answer);


    } else {
      game.updateProgress(false);
      game.giveAnswerFeedback(answer);
    }
  
    game.state.time_count = game.state.time_count_update;
 
    game.state.questionsAnswered++;

    // wait a second
    window.setTimeout(function () {
      //end game else go to next question
      if (game.state.questionsAnswered === game.state.numberOfQuestions) {
        game.endGame();
      } else {
        game.goToNextQuestion();
        intervals.forEach(clearInterval);
        game.startTimer();
      }
    }, 1000);
  },

  drawGaugeValue: function () {
    var currentValue =
      100 /
      (game.state.numberOfQuestions / (game.state.correctAnswers - 1)) /
      100;
    var nextValue = currentValue + 100 / game.state.numberOfQuestions / 100;

    var draw = function (currentValue, nextValue) {
      var bg = game.state.gauge[0];
      var ctx = (ctx = bg.getContext("2d"));
      var imd = null;

      var startRad = 0.75;
      var totalRads = 1.5;

      var sAngle = Math.PI * startRad;

      ctx.beginPath();
      ctx.strokeStyle = "#47338f";
      ctx.lineCap = "round";
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 10.0;

      imd = ctx.getImageData(0, 0, 240, 240);

      $({
        n: currentValue
      }).animate({
        n: nextValue
      }, {
        duration: 1000 * nextValue,
        step: function (now, fx) {
          game.state.scoreNumber.text(Math.ceil(now * 100));
          ctx.putImageData(imd, 0, 0);
          ctx.beginPath();
          ctx.arc(
            120,
            120,
            100,
            sAngle,
            (totalRads * now + startRad) * Math.PI,
            false
          );
          ctx.stroke();
        }
      });
    };
    draw(currentValue, nextValue);
  },

  updateProgress: function (correct) {
    $(game.state.indicators[game.state.questionsAnswered]).addClass(
      correct ? "correct" : "incorrect"
    );
    $(game.state.indicators).removeClass("current");
    $(game.state.indicators[game.state.questionsAnswered + 1]).addClass(
      "current"
    );
  },

  giveAnswerFeedback: function (answer) {
    var answerGroup = answer.parent().parent().find(".answer");
    for (var i = 0; i < answerGroup.length; i++) {
      // disable extra clicks
      answerGroup[i].disabled = true;
      if ($(answerGroup[i]).data("correct")) {
        $(answerGroup[i]).parent().addClass("correct");
      } else {
        $(answerGroup[i]).parent().addClass("incorrect");
      }
    }
  },

  goToNextQuestion: function () {
    var lastQuestionIndex = game.state.questionsAnswered - 1;
    var nextQuestionIndex = game.state.questionsAnswered;
    $(game.state.questions[lastQuestionIndex]).fadeOut(400, function () {
      $(game.state.questions[nextQuestionIndex]).fadeIn(200);
    });
  },
  timesUp: function () {
    var endText =
      "Looks like you’ve run out of time.<br />No worries. You can play up to 5 times a day.";
    game.state.questionsView.fadeOut(400, function () {
      game.state.timeOutText[0].innerHTML = endText;
      game.state.gameEndViewTimesUp.fadeIn(200);
    });
  },

  endGame: function () {
    var endText =
      'You got<br><span class="score">' +
      game.state.correctAnswers +
      " out of " +
      game.state.numberOfQuestions +
      "</span><br> correct";
    game.state.questionsView.fadeOut(400, function () {
      game.state.gameEndText[0].innerHTML = endText;
      game.state.gameEndView.fadeIn(200);
    });
  }
};

game.init();

var drawGaugeBackground = function () {
  var bg = $(".gauge")[0];
  var ctx = bg.getContext("2d");
  var imd = null;
  var sAngle = Math.PI * 0.75;
  var eAngle = Math.PI * 0.25;

  ctx.beginPath();
  ctx.strokeStyle = "#f4f4f4";
  ctx.lineCap = "round";
  ctx.closePath();
  ctx.fill();
  ctx.lineWidth = 30.0;

  imd = ctx.getImageData(0, 0, 240, 240);

  ctx.putImageData(imd, 0, 0);
  ctx.beginPath();
  ctx.arc(120, 120, 100, sAngle, eAngle, false);
  ctx.stroke();
};

drawGaugeBackground();