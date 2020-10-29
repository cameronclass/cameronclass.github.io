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
/*  $("input[name=format]").val() */
/* parseInt($("select[name=parametr]").val()) + */
/* $( "#myselect option:selected" ).text(); */
$(".js-btn").click(function () {
  let hours =
    parseInt($("input[name=days]").val()) *
    parseInt($("input[name=hours]").val()) *
    parseInt($("input[name=pounts]").val());
  $(".mylabel").text(hours);
  $(".mylabel2").text(hours / 2);
  $(".mylabel3").text(parseInt($("select[name=format]").val()) * hours);
  $(".mylabel4").text(parseInt($("select[name=format]").val()) * hours);
  $(".mylabel5").text(parseInt($("select[name=format]").val()) * hours * 0.9);

  if ($("select[name=format] option:selected").val() == 1) {
    $(".label__list").addClass("d-none");
    $(".label__others").removeClass("d-none");
  } else if ($("select[name=format] option:selected").val() == 0) {
    $(".label__list_text").text("сэмплов");
  } else {
    $(".label__list").removeClass("d-none");
    $(".label__others").addClass("d-none");
    $(".label__list_text").text("листовок");
  }
});

$("#form-calculate").submit(function (e) {
  e.preventDefault();

  if (
    inputValidate("#days", $(this)) &&
    inputValidate("#hours", $(this)) &&
    inputValidate("#pounts", $(this)) &&
    inputValidate("#format", $(this)) &&
    inputValidate("#parametr", $(this))
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
