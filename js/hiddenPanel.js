$(document).ready(function () {
    $('.menu').on('click', function () {
        $('#slider').fadeToggle();

        if ($(this).css('left') == '0px') {
            $(this).animate({
                'left': '260px'
            }, 200);
        } else {
            $(this).animate({
                'left': '0px'
            }, 200);
        }
    });
});

$(document).keyup(function (e) {
    if (e.keyCode == 27) {
        $('#slider').fadeOut();
        $('.menu').animate({
            'left': '0px'
        }, 200);
    }
});