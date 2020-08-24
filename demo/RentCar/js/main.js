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
  $(".header__mobile-menu_overlay").click(function () {
    $(this).removeClass("d-block");
    $(".header__mobile-menu_navigation").removeClass(
      "header__mobile-menu_navigation_active"
    );
  });

  /* Modal */
  $(".modal").modal();

  /* Dropdown */
  $(".dropdown-trigger").dropdown(

  );


  /* Select */
  $("select").formSelect();

  /* Searchbar */
  /* $("input.autocomplete").autocomplete(

    {
      data: {
        "Antalya Havalimanı": null,
        "Antalya Merkez": null,
        "Antalya Otogar": null,
        Lara: null,
        Konyaalti: null,
        Ofis: null,
      },
    }

  ); */

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


  /* Accordion */

  var allPanels = $('.accordion > dd').hide();

  $('.accordion > dt > a').click(function () {
    $this = $(this);
    $target = $this.parent().next();

    if (!$target.hasClass('active')) {
      allPanels.removeClass('active').slideUp().delay(50);
      $target.addClass('active').slideDown().delay(50);
    }

    return false;
  });


  /* Tooltip */

  $('.tooltipped').tooltip();

  /* Data Child Seat */

  let allPrice = parseFloat($('[data-all-price]').attr('data-all-price'));
  let childSeatPrice = parseFloat($('[data-child-seat-price]').attr('data-child-seat-price'));
  let exstraDriverPrice = parseFloat($('[data-exstra-driver-price]').attr('data-exstra-driver-price'));

  $('[data-all-price]').text(allPrice.toFixed(2));
  $('[data-child-seat-price]').text(childSeatPrice.toFixed(2));
  $('[data-exstra-driver-price]').text(exstraDriverPrice.toFixed(2));

  $("[data-navigation]").change(function () {
    let navigationPrice = parseFloat($(this).data('navigation'));
    let quantity = null;
    if ($(this).prop('checked')) {
      allPrice = parseFloat($('[data-all-price]').attr('data-all-price'));
      quantity = allPrice + navigationPrice;
      $('[data-all-price]').text(quantity.toFixed(2));
      $('[data-all-price]').attr('data-all-price', quantity);
      return true;
    } else {
      allPrice = parseFloat($('[data-all-price]').attr('data-all-price'));
      quantity = allPrice - navigationPrice;

      $('[data-all-price]').text(quantity.toFixed(2));
      $('[data-all-price]').attr('data-all-price', quantity);
      return false;

    }

  });
  /* Child Seat */
  $('[data-child-seat-count]').change(function () {
    let seatCount = parseFloat($(this).attr('data-child-seat-count'));
    let quantity = null;

    allPrice = parseFloat($('[data-all-price]').attr('data-all-price'));

    console.log(seatCount);
    if ($(this).prop('checked') && seatCount == 1) {
      if ($('[data-old-count-seat]').attr('data-old-count-seat') == 2) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 2;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));

      }
      quantity = parseFloat($('[data-all-price]').attr('data-all-price')) + seatCount * childSeatPrice;
      $('[data-old-count-seat]').attr('data-old-count-seat', seatCount);
      $('[data-all-price]').attr('data-all-price', quantity);
      $('[data-all-price]').text(quantity.toFixed(2));



    } else if ($(this).prop('checked') && seatCount == 2) {

      if ($('[data-old-count-seat]').attr('data-old-count-seat') == 1) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 1;
        $('[data-all-price]').attr('data-all-price', allPrice);

        $('[data-all-price]').text(allPrice.toFixed(2));

      }

      quantity = parseFloat($('[data-all-price]').attr('data-all-price')) + seatCount * childSeatPrice;
      $('[data-old-count-seat]').attr('data-old-count-seat', seatCount);
      $('[data-all-price]').attr('data-all-price', quantity);
      $('[data-all-price]').text(quantity.toFixed(2));

    } else if ($(this).prop('checked') && seatCount == 0) {

      if ($('[data-old-count-seat]').attr('data-old-count-seat') == 1) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 1;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));
      }
      if ($('[data-old-count-seat]').attr('data-old-count-seat') == 2) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 2;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));

      }

      $('[data-old-count-seat]').attr('data-old-count-seat', seatCount);

    }

  });

  /* Exstra Driver */
  $('[data-exstra-driver-count]').change(function () {
    let driverCount = parseFloat($(this).attr('data-exstra-driver-count'));
    let quantity = null;

    allPrice = parseFloat($('[data-all-price]').attr('data-all-price'));

    console.log(driverCount);
    if ($(this).prop('checked') && driverCount == 1) {
      if ($('[data-old-exstra-price]').attr('data-old-exstra-price') == 2) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 2;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));
      }
      quantity = parseFloat($('[data-all-price]').attr('data-all-price')) + driverCount * childSeatPrice;
      $('[data-old-exstra-price]').attr('data-old-exstra-price', driverCount);
      $('[data-all-price]').attr('data-all-price', quantity);
      $('[data-all-price]').text(quantity.toFixed(2));

    } else if ($(this).prop('checked') && driverCount == 2) {

      if ($('[data-old-exstra-price]').attr('data-old-exstra-price') == 1) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 1;
        $('[data-all-price]').attr('data-all-price', allPrice);

        $('[data-all-price]').text(allPrice.toFixed(2));

      }

      quantity = parseFloat($('[data-all-price]').attr('data-all-price')) + driverCount * childSeatPrice;
      $('[data-old-exstra-price]').attr('data-old-exstra-price', driverCount);
      $('[data-all-price]').attr('data-all-price', quantity);
      $('[data-all-price]').text(quantity.toFixed(2));

    } else if ($(this).prop('checked') && driverCount == 0) {

      if ($('[data-old-exstra-price]').attr('data-old-exstra-price') == 1) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 1;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));
      }
      if ($('[data-old-exstra-price]').attr('data-old-exstra-price') == 2) {
        allPrice = parseFloat($('[data-all-price]').attr('data-all-price')) - childSeatPrice * 2;
        $('[data-all-price]').attr('data-all-price', allPrice);
        $('[data-all-price]').text(allPrice.toFixed(2));

      }

      $('[data-old-exstra-price]').attr('data-old-exstra-price', driverCount);

    }

  });

});