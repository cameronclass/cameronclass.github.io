$(document).ready(function () {

    /*
    Reference: http://jsfiddle.net/BB3JK/47/
    */

    $('select').each(function () {
        var $this = $(this), numberOfOptions = $(this).children('option').length;

        $this.addClass('select-hidden');
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());

        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);

        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        var $listItems = $list.children('li');

        $styledSelect.click(function (e) {
            e.stopPropagation();

            $('div.select-styled.active').not(this).each(function () {
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });

        $listItems.click(function (e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
            //console.log($this.val());
        });

        $(document).click(function () {
            $styledSelect.removeClass('active');

            $list.hide();
        });

    });

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
            $('.suggestions div').each(function(elem, index){
                    $(this).click(function(e){
                        let val = $(this).text()
                        suggestionsPanel.classList.remove('active')
                        $('.search-input').removeClass('search-active')
                        $('.suggestions').removeClass('search-active-suggestions')
                        $('.search-input').val(val)
                    })
            })

        })
        if(input === ''){
            suggestionsPanel.innerHTML = ''
            suggestionsPanel.classList.remove('active')
            $('.search-input').removeClass('search-active')
            $('.suggestions').removeClass('search-active-suggestions')
   
        }

    })


    
});


