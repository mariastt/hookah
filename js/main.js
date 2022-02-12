$(document).ready(function () {

    function checkWidth() {
        let windowWidth = $('body').innerWidth();
        let elem = $('#discounts-container');
        if (windowWidth < 929) {
            elem.addClass('slick');
        } else {
            elem.removeClass('slick');
        }
        let block = $('#gallery-container')
        if (windowWidth < 767) {
            block.addClass('slick2');
        } else {
            block.removeClass('slick2');
        }
    }
    checkWidth(); // проверит при загрузке страницы
    $(window).resize(function () {
        checkWidth(); // проверит при изменении размера окна клиента
    });

    new WOW({
        animateClass: 'animate__animated'
    }).init();


    $('.masters-container').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                },
            }
        ]
    });

    $('.slick').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });

    $('.slick2').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
    });

    $('.category').click((e) => {

        let currentElement = $(e.target);
        $('.products-container').hide();
        let id = currentElement.data('id');
        $('#' + id).show();

        $('.category').removeClass('active');
        currentElement.addClass('active');

    })

    $('.popup').magnificPopup({
        type: 'image'
    });

    $('#btn').click(() => {
        let error1 = $('#error-1');
        let error2 = $('#error-2');
        error1.hide();
        error2.hide();

        let name = $('#name');
        let phone = $('#phone');
        name.css('border-color', 'rgb(98, 36, 223)');
        phone.css('border-color', 'rgb(98, 36, 223)');

        let error = false;

        if (!name.val()) {
            error = true;
            error1.show();
            name.css('border-color', 'red');
        }
        if (!phone.val()) {
            error = true;
            error2.show();
            phone.css('border-color', 'red');
        }

        if (error === false) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + name.val() + '&phone=' + phone.val(),
                success: () => {
                    $('#sent-from').show();
                    $('#form').hide();
                },
                error: () => {
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста по номеру телефона.');
                }
            });
        }
    });

    // плавная прокрутка к блокам меню
    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

    $('#burger').click(() => {
        $('#header-container').toggleClass('menu-open');
    })
    $('#header-container #header-menu a').click(() => {
        $('#header-container').removeClass('menu-open');
    })

});