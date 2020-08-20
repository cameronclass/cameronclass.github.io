// Preloader
$(function () {
  var $preloader = $("#page-preloader"),
    $spinner = $preloader.find(".spinner");
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut("slow");
});

$(document).ready(function () {
  /* Menu Open */
  $(".js-menu-open").click(function () {
    $(".header__mobile-menu_overlay").addClass("d-block");
    $(".header__mobile-menu_navigation").addClass(
      "header__mobile-menu_navigation_active"
    );
  });
  $(".header__mobile-menu_overlay").click(function(){
    $(this).removeClass("d-block");
    $(".header__mobile-menu_navigation").removeClass(
      "header__mobile-menu_navigation_active"
    );
  });

  /* Modal */
  $(".modal").modal();

  /* Dropdown */
  $(".dropdown-trigger").dropdown();

  /* Select */
  $("select").formSelect();

  /* Searchbar */
  $("input.autocomplete").autocomplete({
    data: {
      "Antalya Havalimanı": null,
      "Antalya Merkez": null,
      "Antalya Otogar": null,
      Lara: null,
      Konyaalti: null,
      Ofis: null,
    },
  });

  /* Tabs */
  $(".tabs").tabs();

  /* Datapicker */
  $(".datepicker").datepicker({
    autoClose: true,
    // internationalization
    i18n: {
      cancel: "Cancel",
      clear: "Clear",
      done: "Ok",
      previousMonth: "‹",
      nextMonth: "›",
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      monthsShort: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      weekdays: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"],
    },
  });

  /* Timepicker */
  $(".timepicker").timepicker({
    autoClose: true,
    defaultTime: "now",
    twelveHour: false,
  });


  /* Mask Input */
  $("#date-birth").mask("99 / 99 / 9999");
});
