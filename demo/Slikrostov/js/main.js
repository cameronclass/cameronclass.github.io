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

    $('.filter-container .select-container > input').each(function(e){
        const string = $(this).val($(this).val().substr(0, 10))
        // console.log(string.substr(0, 5));
    })


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

            if(filterContainer)
            {

                if($(window).width() < 520){
                    
                        $(this).parent().parent().find('input').val($(this).text().substr(0, 45));
                    
                  
                    return true;
                }
                
                if($(window).width() <= 1024){
                    
                    $(this).parent().parent().find('input').val($(this).text().substr(0, 7));
                
              
                return true;
            }
                if($(this).text().length > 8){
                    $(this).parent().parent().find('input').val($(this).text().substr(0, 8));
                    return true
                }
            
            }
            

            $(this).parent().parent().find('input').val($(this).text());

        });
    })



});


