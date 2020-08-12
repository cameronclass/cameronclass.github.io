$.datetimepicker.setLocale("en");

$("#datetimepicker_format").datetimepicker({
  value: "2015/04/15 05:03",
  format: $("#datetimepicker_format_value").val(),
});
console.log($("#datetimepicker_format").datetimepicker("getValue"));

$("#datetimepicker_format_change").on("click", function (e) {
  $("#datetimepicker_format")
    .data("xdsoft_datetimepicker")
    .setOptions({ format: $("#datetimepicker_format_value").val() });
});
$("#datetimepicker_format_locale").on("change", function (e) {
  $.datetimepicker.setLocale($(e.currentTarget).val());
});

$("#datetimepicker").datetimepicker({
  dayOfWeekStart: 1,
  lang: "en",
  disabledDates: ["1986/01/08", "1986/01/09", "1986/01/10"],
  startDate: "1986/01/05",
});
$("#datetimepicker").datetimepicker({
  value: "2015/04/15 05:03",
  step: 10,
});

$(".some_class").datetimepicker();

$("#default_datetimepicker").datetimepicker({
  formatTime: "H:i",
  formatDate: "d.m.Y",
  //defaultDate:'8.12.1986', // it's my birthday
  defaultDate: "+03.01.1970", // it's my birthday
  defaultTime: "10:00",
  timepickerScrollbar: false,
});

$("#datetimepicker10").datetimepicker({
  step: 5,
  inline: true,
});
$("#datetimepicker_mask").datetimepicker({
  mask: "9999/19/39 29:59",
});

$("#datetimepicker1").datetimepicker({
  datepicker: false,
  format: "H:i",
  step: 5,
});
