// Preloader
$( function() {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');

    /* Select */
    $('.theme-select option[disabled="true"]').each(function () {
      $(this).attr("style", "color:red");
    });
});
