// Preloader
$( function() {
    var $preloader = $('#page-preloader'),
        $spinner   = $preloader.find('.spinner');
    $spinner.fadeOut();
    $preloader.delay(350).fadeOut('slow');
});




$(document).ready(function(){

  // Js Toogle
  $(".js-tags-toogle").click(function(){
    $("#js-tags-ul").toggleClass("h-auto");
  });


  // If more 8 Add Class
  if ($('#js-tags-ul li').length > 9) {
    $(".js-tags-toogle").addClass("display-block");
   } else {
    $(".js-tags-toogle").removeClass("display-block");
  }

  // Card filter
  $(".js-card-filter").click(function(){
    $(this).toggleClass("card-filter");
  });

  // Change Card View
  $(".js-card-list").click(function(){
    $(this).addClass("active");
    $(".js-card-table").removeClass("active");
    $(".catalog__card").addClass("catalog__card_list");
  });
  $(".js-card-table").click(function(){
    $(this).addClass("active");
    $(".js-card-list").removeClass("active");
    $(".catalog__card").removeClass("catalog__card_list");
  });

  // Category toggleClass
  // $(".js-category-open").click(function(e){
  //   e.preventDefault();
  //   $(".catalog-ul ul").toggleClass("display-block");
  // });

  $(function(){
   $('.js-master-readmore').readmore({
     speed: 500,
     lessLink: '<div class="js-master-readmore-btn"><a href="#">Свернуть</a></div>',
     moreLink: '<div class="js-master-readmore-btn"><a href="#">Читать еще</a></div>',
     collapsedHeight: 58,
     });
  });

});
