// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");

  /* Header */
  /* $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      $("header").addClass("header-fixed");
    } else {
      $("header").removeClass("header-fixed");
    }
  }); */
  /* Hamburger */
  $(".hamburger").click(function () {
    $(this).toggleClass("is-active");
    $(".header__menu").toggleClass("header__menu_active");
    $("html").toggleClass("lock");
  });
});
function inputValidate(selector, that) {
  if (
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .val() == ""
  ) {
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .css("border", "1px solid red");
    return false;
  } else {
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .css("border", "1px solid green");
    return true;
  }
}
function inputClientValidate(selector, that) {
  if (
    $(that)
      .closest("#feedback")
      .find("" + selector + "")
      .val() == ""
  ) {
    $(that)
      .closest("#ffeedback")
      .find("" + selector + "")
      .css("border", "1px solid red");
    return false;
  } else {
    $(that)
      .closest("#feedback")
      .find("" + selector + "")
      .css("border", "1px solid green");
    return true;
  }
}

function selectValidate(selector, that) {
  if (
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .val() == ""
  ) {
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .css("border", "1px solid red");
    return false;
  } else {
    $(that)
      .closest("#form-calculate")
      .find("" + selector + "")
      .css("border", "1px solid green");
    return true;
  }
}

// this will run on every select value change. if you want it to only run for those specific selects, add the same class in all of them and change the selector to $('select.yourclass')

$(".js-btn").on("click", function () {
  $(".mylabel").text(
    parseInt($("input[name=days]").val()) *      parseInt($("input[name=hours]").val()) *      parseInt($("input[name=pounts]").val())
    /*  $("input[name=format]").val() */
    /* parseInt($("select[name=parametr]").val()) + */
  );
});

$("#form-calculate").submit(function (e) {
  e.preventDefault();

  if (
    inputValidate("#days", $(this)) &&
    inputValidate("#hours", $(this)) &&
    inputValidate("#pounts", $(this)) &&
    inputValidate("#format", $(this))
  ) {
    $(".js-calc-modal").addClass("js-modal-open");
    $("html").addClass("lock");
  }
});
// $('#feedback').submit(function(){
//   inputClientValidate("#client_name", $(this))
// })
/*  js-modal-open */
$(".js-calc-modal__modal .close-modal").click(function (e) {
  e.preventDefault();
  $(".js-calc-modal").removeClass("js-modal-open");
  $("html").removeClass("lock");
});

jQuery(function ($) {
  $(".phone").mask("+7 (999) 999-9999");
});
