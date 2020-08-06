// Preloader
/* $(function () {
  var $preloader = $('#page-preloader'),
    $spinner = $preloader.find('.spinner');
  $spinner.fadeOut();
  $preloader.delay(350).fadeOut('slow');
}); */


$(document).ready(function () {

  /* Modal */
  $('.modal').modal();


  /* Searchbar */
  $('input.autocomplete').autocomplete({
    data: {
      "Apple": null,
      "Microsoft": null,
      "Google": null,
    },
  });


  /* Tabs */
  $('.tabs').tabs();



  /* Datapicker */

  $(".datepicker").datepicker({
    autoClose: true,
    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ],
      monthsShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
  });

  /* $("#start").datepicker({
    autoClose: true,
    minDate: today,
  });

  $("#end").datepicker({
    autoClose: true,
  }); */





  /* Timepicker */
  $('.timepicker').timepicker({
    autoClose: true,
  });





});

