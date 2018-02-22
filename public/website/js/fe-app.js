let transparent = true;
let didScroll;
let lastScrollTop = 0;
let delta = 5;
let navbarHeight = 0;

$(document).ready(function () {
    setTimeout(function () {
        $('.msg-alert').slideUp('slow');
    },3000);
    window_width = $(window).width();
    //  Activate the tooltips
    $('[data-toggle="tooltip"]').tooltip();
    //      Activate the switches with icons
    if ($('.switch').length != 0) {
        $('.switch')['bootstrapSwitch']();
    }
    //      Activate regular switches
    if ($("[data-toggle='switch']").length != 0) {
        $("[data-toggle='switch']").bootstrapSwitch();
    }
    //    Activate bootstrap-select
    if ($(".selectpicker").length != 0) {
        $(".selectpicker").selectpicker();
    }

    $('.modal').appendTo('body');

    if ($(".tagsinput").length != 0) {
        $(".tagsinput").tagsInput();
    }
    // Limit number of characters in limited textarea
    $('.textarea-limited').keyup(function () {
        let max = $(this).attr('maxlength');
        let len = $(this).val().length;
        if (len >= max) {
            $('#textarea-limited-message').text(' you have reached the limit');
        } else {
            let char = max - len;
            $('#textarea-limited-message').text(char + ' characters left');
        }
    });
    if (window_width >= 768) {
        big_image = $('.page-header[data-parallax="true"]');

        if (big_image.length != 0) {
            $(window).on('scroll', pk.checkScrollForPresentationPage);
        }
    }
    if ($("#datetimepicker").length != 0) {
        $('#datetimepicker').datetimepicker({
            icons: {
                time: "fa fa-clock-o",
                date: "fa fa-calendar",
                up: "fa fa-chevron-up",
                down: "fa fa-chevron-down",
                previous: 'fa fa-chevron-left',
                next: 'fa fa-chevron-right',
                today: 'fa fa-screenshot',
                clear: 'fa fa-trash',
                close: 'fa fa-remove'
            }
        });
    };
    // Change the collor of navbar collapse
    $('#navbarToggler').on('show.bs.collapse', function () {
        if ($('nav').hasClass('navbar-transparent') && $(document).scrollTop() < 50) {
            $('.navbar').addClass('no-transition');
            $('nav').removeClass('navbar-transparent');
        }
    }).on('hidden.bs.collapse', function () {
        if ($(document).scrollTop() < 50) {
            $('.navbar').removeClass('no-transition');
            $('nav:first-of-type').addClass('navbar-transparent');
        }
    });
    // Navbar color change on scroll
    if ($('.navbar[color-on-scroll]').length != 0) {
        $(window).on('scroll', pk.checkScrollForTransparentNavbar)
    }
    $('.btn-tooltip').tooltip();
    $('.label-tooltip').tooltip();
    // Carousel
    $('.carousel').carousel({
        interval: 20000
    });
    $('.form-control').on("focus", function () {
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function () {
        $(this).parent(".input-group").removeClass("input-group-focus");
    });
    // Init popovers
    pk.initPopovers();
     // Activate Navbar
    if ($('.nav-down').length != 0) {
        pk.checkScrollForMovingNavbar();
    };
});
$(document).on('click', '.navbar-toggler', function () {
    $toggle = $(this);
    if (pk.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
        pk.misc.navbar_menu_visible = 0;
        setTimeout(function () {
            $toggle.removeClass('toggled');
            $('#bodyClick').remove();
        }, 550);
    } else {
        setTimeout(function () {
            $toggle.addClass('toggled');
        }, 580);
        div = '<div id="bodyClick"></div>';
        $(div).appendTo("body").click(function () {
            $('html').removeClass('nav-open');
            pk.misc.navbar_menu_visible = 0;
            $('#bodyClick').remove();
            setTimeout(function () {
                $toggle.removeClass('toggled');
            }, 550);
        });
        $('html').addClass('nav-open');
        pk.misc.navbar_menu_visible = 1;
    }
});

pk = {
    misc: {
        navbar_menu_visible: 0
    },
    checkScrollForTransparentNavbar: debounce(function () {
        if ($(document).scrollTop() > $(".navbar").attr("color-on-scroll")) {
            if (transparent) {
                transparent = false;
                $('.navbar[color-on-scroll]').removeClass('navbar-transparent');
            }
        } else {
            if (!transparent) {
                transparent = true;
                $('.navbar[color-on-scroll]').addClass('navbar-transparent');
            }
        }
    }, 17),

    checkScrollForMovingNavbar: function () {
        // Hide Header on on scroll down
        navbarHeight = $('.navbar').outerHeight();

        $(window).scroll(function (event) {
            didScroll = true;
        });
        setInterval(function () {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);
    },

    checkScrollForPresentationPage: debounce(function () {
        oVal = ($(window).scrollTop() / 3);
        big_image.css({
            'transform': 'translate3d(0,' + oVal + 'px,0)',
            '-webkit-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-ms-transform': 'translate3d(0,' + oVal + 'px,0)',
            '-o-transform': 'translate3d(0,' + oVal + 'px,0)'
        });
    }, 4),
    initPopovers: function () {
        if ($('[data-toggle="popover"]').length != 0) {
            $('body').append('<div class="popover-filter"></div>');

            //    Activate Popovers
            $('[data-toggle="popover"]').popover().on('show.bs.popover', function () {
                $('.popover-filter').click(function () {
                    $(this).removeClass('in');
                    $('[data-toggle="popover"]').popover('hide');
                });
                $('.popover-filter').addClass('in');
            }).on('hide.bs.popover', function () {
                $('.popover-filter').removeClass('in');
            });

        }
    },
}

function debounce(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

function hasScrolled() {
    let st = $(this).scrollTop();
    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $('.navbar.nav-down').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $('.navbar.nav-up').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
};
