// Preloader register-toggle__btn_icon
$(function () {
  $(".js-modal-open").click( function(){
    $(".register-modal").fadeIn("fast");
  });

  $(".register-modal__overlay").click(function () {
    $(".register-modal").fadeOut("fast");
  });

  $(".register-modal__close").click(function () {
    $(".register-modal").fadeOut("fast");
  });



  $(".register-toggle-add button").click(function () {
    $(".register-toggle").parent().append('<div class="register-toggle"> <div class="register-toggle__btn"> <div class="register-toggle__btn_block"> <div class="register-toggle__btn_title"> Добавить члена команды </div><div class="register-toggle__btn_helper"> Введите информацию об участнике </div></div><div class="register-toggle__btn_icon"> <span class="i-plus"></span> </div></div><div class="register-toggle__content"> <div class="register-form register-modal__row margin-top-1"> <div class="column-6"> <div class="register-form__title">ФИО</div><div class="register-form__helper">Используйте кириллицу</div></div><div class="column-6"> <input type="text" class="register-input" placeholder="Введите ФИО"> </div></div><div class="register-form register-modal__row"> <div class="column-6"> <div class="register-form__title">Регион</div></div><div class="column-6"> <div class="register-select"> <select> <option selected disabled>Выберите регион</option> <option value="1">Регион 1</option> <option value="2">Регион 2</option> <option value="3">Регион 3</option> </select> </div></div></div><div class="register-form register-modal__row"> <div class="column-6"> <div class="register-form__title">Возраст</div></div><div class="column-6"> <div class="register-select"> <select> <option selected disabled>Выберите возраст</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> </select> </div></div></div><div class="register-form register-modal__row"> <div class="column-6"> </div><div class="column-6 register-toggle-delete"> <button type="button">Удалить участника</button> </div></div></div></div>');
  });
  $(".register-toggle-delete button").click(function () {
    $(this).parent().parent().parent().parent().remove();
  });


  $(".register-toggle__btn").click(function (e) {
    e.preventDefault();
    $(this).parent().find(".register-toggle__content").slideToggle(200);
    $(this).find(".register-toggle__btn_helper").toggleClass("visibility-none");
    $(this).find(".register-toggle__btn_icon").toggleClass("rotate-45");
  });

});

$(document).ready(function () {
  //override jquery validate plugin defaults
  // http://stackoverflow.com/a/18754780

  $.validator.setDefaults({
    highlight: function (element) {
      $(element).closest(".register-input").addClass("has-error");
      $(element).closest(".register-select").addClass("has-error");
    },

    unhighlight: function (element) {
      $(element).closest(".register-input").removeClass("has-error");
      $(element).closest(".register-select").removeClass("has-error");
    },

    errorElement: "span",

    errorClass: "help-block",

    errorPlacement: function (error, element) {
      if (element.parent(".input-group").length ||
        element.prop("type") === "checkbox" ||
        element.prop("type") === "radio"
      ) {
        error.insertAfter(element.parent());
      } else {
        error.insertAfter(element);
      }
    }
  });

  $("form").validate({
    rules: {
      formCommand: {
        required: true,
        maxlength: 255
      },
      formCode: {
        required: true,
        maxlength: 255
      },
      formName: {
        required: true,
      },
      formEmail: {
        required: true,
      },
      formNumber: {
        required: true,
        minlength: 10,
        maxlength: 11
      },
      formRegion: {
        required: true,
      },
      formYear: {
        required: true,
      },
      formFrom: {
        required: true,
      }
      //formRegion
    },

    messages: {
      formCommand: {
        required: "Введите название команды!",
      },
      formCode: {
        required: "Введите название кодовое слово!",
      },
      formName: {
        required: "Введите ФИО!"
      },
      formName: {
        required: "Введите Email!"
      }, 
      formNumber: {
        required: "Введите Номер Телефона!",
      },
      formRegion: {
        required: "Выберите вариант!",
      },
      formYear: {
        required: "Выберите вариант!",
      },
      formFrom: {
        required: "Выберите вариант!",
      }
    }
  });
});