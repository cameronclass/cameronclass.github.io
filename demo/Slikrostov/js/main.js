$(document).ready(function () {

    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        autoplay: {
            delay: 2500
        },
    });
    const dates = [
        { year: '2014' },
        { year: '2015' },
        { year: '2016' },
        { year: '2017' },
        { year: '2018' },
        { year: '2019' },
        { year: '2020' },

    ];
    $('.search-input').on('keyup', (e) => {
        let input = $('.search-input').val();

        const suggestionsPanel = document.querySelector('.suggestions')
        suggestionsPanel.innerHTML = ''
        const suggestions = dates.filter((date) => {
            return date.year.startsWith(input);
        })
        suggestions.forEach(function (suggested) {
            suggestionsPanel.classList.add('active')
            $('.search-input').addClass('search-active')
            $('.suggestions').addClass('search-active-suggestions')
            const div = document.createElement('div')
            div.innerHTML = suggested.year
            suggestionsPanel.appendChild(div)
            $('.suggestions div').each(function (elem, index) {
                $(this).click(function (e) {
                    let val = $(this).text()
                    suggestionsPanel.classList.remove('active')
                    $('.search-input').removeClass('search-active')
                    $('.suggestions').removeClass('search-active-suggestions')
                    $('.search-input').val(val)
                })
            })

        })
        if (input === '') {
            suggestionsPanel.innerHTML = ''
            suggestionsPanel.classList.remove('active')
            $('.search-input').removeClass('search-active')
            $('.suggestions').removeClass('search-active-suggestions')

        }

    });




    $('.select-container, .filter-container >.select-container').each(function (e) {


        $(this).click(function (e) {

            let input = $(this).find('input')


            if (input.hasClass('input-active')) {

                $(this).find('.input-arrow').addClass('input-arrow-close')
                input.removeClass('input-active')
                $(this).find('.select-container__options').removeClass('active')
                $(this).find('.input-arrow').removeClass('input-arrow-active')
               
                return true;
            }

            $(this).find('.input-arrow').removeClass('input-arrow-close')
            input.addClass('input-active')
            $(this).find('.select-container__options').addClass('active')
            $(this).find('.input-arrow').addClass('input-arrow-active')
        })



    })

    $(this).find('.select-container__options div').each(function (e) {
        $(this).click(function (e) {
            const  filterContainer = $(this).parent().parent().parent().parent().parent().hasClass('filter-container')
     /*       if(filterContainer){
            $(this).parent().parent().find('.input-arrow').removeClass('input-arrow').removeClass('input-arrow-active')
           } */
            

            $(this).parent().parent().find('input').val($(this).text());

        });
    })
});


$('.checkout-container').each(function(){
    
    $(this).find('.delete').click(function () {
        console.log($(this).parent().parent().parent().slideDown( "slow", function() {
            $(this).remove()
          }))
    })
})

function increaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('number').value = value;
  }
  
  function decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10);
    value = isNaN(value) ? 0 : value;
    if(value <= 1){
        value == 1
    }else{
        value--;
    }
    
    document.getElementById('number').value = value;
  }

$('#decrease').click(decreaseValue)
$('#increase').click(increaseValue)
