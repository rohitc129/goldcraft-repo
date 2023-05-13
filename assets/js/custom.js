$(document).ready(function () {
    $(".preloader").fadeOut();

    AOS.init({
        // offset: -500
        startEvent: 'load',
    });

    $('.menu-btn,.mob-navbar ul li a').on('click', function () {
        $('.menu-btn').toggleClass('active-menu-btn');
        $('.mob-navbar').slideToggle();
    });

    $('.homeslider,.benefits-slider').slick({
        arrows: false,
        dots: true
    });

    $('.development-slider').slick({
        arrows: false,
        dots: true,
        autoplay: true
    });

    $('.gallery-slider,.gallery-slider-popup').slick({
        arrows: true,
        dots: true
    });

    $('.enquiry').on('click', function () {
        $('.popup-enquiry').fadeIn();

        setTimeout(function () {
            $('.menu-btn').removeClass('active-menu-btn');
            $('.mob-navbar').slideUp();
        }, 500)
    });

    $('.expand').on('click', function () {
        $('.gallery-slider-popup').slick('refresh');
        $('.popup-gallery').fadeIn();
    });

    $('.fullscreen').on('click', function () {
        $('.popup-layout').fadeIn();
    });

    $('#imageZoom').imageZoom();

    $('.action p').on('click', function (e) {
        var actId = $(this).attr('id');
        if (actId == 'plus') {
            $('#plus').removeClass('clickable');
            $('#minus').addClass('clickable');
        } else {
            $('#minus').removeClass('clickable');
            $('#plus').addClass('clickable');
        }
        $('#imageZoom').trigger('click');
    })

    $('.close').on('click', function () {
        $('.popup-overlay').fadeOut();
    })

    $('.btn').on('click', function () {
        $('.btn').removeClass('selected-interest');
        $(this).addClass('selected-interest');
    })
});