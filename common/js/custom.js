$(function () {
    $('.lazy').Lazy({
        visibleOnly: true,
    });
});

$(function () {
    $('.lazy-all').Lazy({
        visibleOnly: false,
    });
});

var isBreakPoint = function (bp) {
    var bps = [480, 768, 960, 1024],
        w = $(window).width(),
        min, max
    for (var i = 0, l = bps.length; i < l; i++) {
        if (bps[i] === bp) {
            min = bps[i-1] || 0
            max = bps[i]
            break
        }
    }
    return w > min && w <= max
}

function detectIE() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');

    if (msie > 0) {
        $('body').addClass('only-ie');

        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);

    }

    var trident = ua.indexOf('Trident/');

    if (trident > 0) {
        $('body').addClass('only-ie');

        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');

    if (edge > 0) {

        $('body').addClass('only-ie');
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);

    }

    // other browser
    return false;

}

/***************** CARGA IMAGES DESKTOP Y RESP DEPENDIENDO WITH *****************/

function chooseBgImage(sectionBoxImg, width){  

    sectionBoxImg.each(function(e) {

        var sectionBoxImgBg = $(this).attr('data-src');
        var sectionBoxImgBgResp = $(this).attr('data-src-movil');
        var sectionBoxImgBg = 'url(' + sectionBoxImgBg + ')';
        var sectionBoxImgBgResp = 'url(' + sectionBoxImgBgResp + ')';

        (width >= 768) ? $(this).css({'background-image': sectionBoxImgBg}) : $(this).css({'background-image': sectionBoxImgBgResp});

    });
}

/***************** CARGA IMAGES DESKTOP Y RESP DEPENDIENDO WITH *****************/


/***************** SECTION IFRAME 100% - HOME-ES *****************/

    var sectionPlayIframe  = $('.section-iframe-100 ');

    if (sectionPlayIframe.length) {
        var slideLinkUrlIframe = sectionPlayIframe.attr('data-src-video');
    }
    
    var playInitialIframe  = $('.section-iframe-100 .section-video-100-play_invible');
    var buttonsIframe  = $('.section-iframe-100 .section-iframe-100-buttons');
    var playIframe  = $('.section-iframe-100 .section-iframe-100-buttons .section-iframe-100-buttons-play');
    var volumeIframe = $('.section-iframe-100 .section-iframe-100-buttons .section-iframe-100-buttons-volume');


    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    var player;

    function onPlayerReady(event) {
        event.target.playVideo();
    }

    var done = false;

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('video_home-1', {
            width: null,
            height: null,
            videoId: slideLinkUrlIframe,
            playerVars : {
                'autoplay' : 0,
                'rel' : 0,
                'showinfo' : 0,
                'egm' : 0,
                'showsearch' : 0,
                'controls' : 0,
                'modestbranding' : 1,
                'autohide' : 0,
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        player.stopVideo();
    }
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();

    }


    var clickEventFilter = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

    playInitialIframe.on(clickEventFilter, function () {
        sectionPlayIframe.addClass('active');
        player.playVideo();
        buttonsIframe.fadeToggle();
        playInitialIframe.remove();

    });

    playIframe.on(clickEventFilter, function () {

        playIframe.toggleClass('active');


        if (playIframe.hasClass('active')) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }

    });


    volumeIframe.on(clickEventFilter, function () {

        volumeIframe.toggleClass('active');


        if (volumeIframe.hasClass('active')) {
            player.mute();
        } else {
            player.unMute();
        }

    });


/***************** end SECTION IFRAME 100% - HOME-ES *****************/

$(document).ready(function () {

    detectIE();

    if (navigator.userAgent.indexOf('Mac') > 0) {
        $('body').addClass('only-mac');
    }

    var clickEventFilter = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

    /***************** HEADER *****************/

    var langSelector = $('.section-header-lang');
    var langSelectionBox = $('.section-header-lang-select');
    var langSelectionBoxItems = $('.section-header-lang-items > a');

    /*** LANG ***/

    langSelectionBox.on(clickEventFilter, function () {
        langSelector.toggleClass('active');
    });

    langSelectionBoxItems.on(clickEventFilter, function () {
        event.preventDefault();
        langSelector.toggleClass('active');

        var selectLang = $(this).html();
        langSelectionBox.html(selectLang);

        var selectedLang = $(this).data('transformation');
        var locale = $('link[hreflang="'+selectedLang+'"][rel="alternate"]').attr("href");

        window.location.replace(locale);

    });

    /*** end LANG ***/

    /*** NAV ***/

    var burguerIcon = $('.section-header-box-icon-nav');
    var navBox = $('.section-header-box-nav');

    burguerIcon.on(clickEventFilter, function () {

        $('body').toggleClass('nav-active');
        burguerIcon.toggleClass('active');
        navBox.toggleClass('active');

    });

    $('.section-header-box-nav-close').on(clickEventFilter, function () {

        $('body').toggleClass('nav-active');
        burguerIcon.toggleClass('active');
        navBox.toggleClass('active');

    });

    /*** end NAV ***/

    /*** NAV ACTIVE ***/

    var navItemsLink = $('.section-header .section-header-box .section-header-box-nav .section-header-box-nav-box .section-header-box-nav-box-items a');

    urlPageCurrent = window.location.href.split("/").reverse()[0];
    navItemsLink.each(function () {
        var urlPageLink = this.href.split("/").reverse()[0];

        if (urlPageLink == urlPageCurrent) {
            $(this).addClass("active");
        }

    });

    /*** end NAV ACTIVE ***/

    /*** SEARCH ***/

    var searchIcon = $('.section-header-search-icon');
    var searchCloseIcon = $('.section-header-search-box-close');
    var searchBox = $('.section-header-search-box');

    searchIcon.on(clickEventFilter, function () {
        $('body').toggleClass('search-active');
        searchBox.toggleClass('active');
    });

    searchCloseIcon.on(clickEventFilter, function () {
        $('body').toggleClass('search-active');
        searchBox.toggleClass('active');
    });

    function send_form() {
        document.headerSearchForm.submit()
    }

    /*** end SEARCH ***/

    /***************** end HEADER *****************/


    /***************** SECTION PRINCIPAL SLIDER *****************/

    var swiper1 = new Swiper('.section-principal_slider-box', {
        pagination: {
            el: '.section-principal_slider-box-inner-paggination',
            clickable: true,
        },
        preventClicks: false,
        preloadImages: true,
        lazy: {
            loadPrevNext: true,  
        },
    });

    /***************** end SECTION PRINCIPAL SLIDER *****************/


    /***************** SECTION COLUMNX4-SCROLL_RESP - POPULAR RECETAS *****************/

    var swiper2 = new Swiper('.section-column_x4_scroll-box-popular_recipes', {
        scrollbar: {
            el: '.section-column_x4_scroll-box-popular_recipes-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        breakpointsInverse: true,
        preventClicks: false,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /***************** end SECTION COLUMNX4-SCROLL_RESP - POPULAR RECETAS *****************/


    /***************** SECTION COLUMNX4-SCROLL_RESP - POPULAR BLOG *****************/

    var swiper3 = new Swiper('.section-column_x4_scroll-box-popular_blog', {
        scrollbar: {
            el: '.section-column_x4_scroll-box-popular_blog-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /***************** end SECTION COLUMNX4-SCROLL_RESP - POPULAR BLOG *****************/


    /***************** SECTION SCROLL ALL - HOME LOVE *****************/

    function chargeBackground() {

        var containImg = $('.section-scroll_all .section-scroll-all-content-inner-items-box-img');

        containImg.each(function (n) {
            var containImgAttr = $(this).attr('data-background');
            containImgSrc = 'url(' + containImgAttr + ')';
            $(this).css({'background-image': containImgSrc});
        });

    };

    var width = $(window).width();

    if (width > 960) {
        chargeBackground();
    }

    $(window).on('resize', function () {

        if ($(this).width() > 960) {
            chargeBackground();
        }

    })

    var swiper4 = new Swiper('.section-scroll_all-home-content', {
        scrollbar: {
            el: '.section-scroll_all-home-scrollbar',
            hide: false,
        },
        preloadImages: true,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.2,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.8,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.1,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.1,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 24,
            },
        }
    });

    /***************** end SECTION SCROLL ALL - HOME LOVE *****************/


    /***************** SECTION COLUMNX4 - ALL RECETAS *****************/

    /* pagination */

    $(function () {

        $('#pagination-all_recipes').easyPaginate({
            paginateElement: 'a.section-column_x4-box-items',
            elementsPerPage: 150,
            prevButtonText: '',
            nextButtonText: '',
            effect: 'default'
        });

        $('.lazy').Lazy({
            visibleOnly: true,
        });

    });

    /* end pagination */

    /***************** end SECTION COLUMNX4 - ALL RECETAS *****************/


    /***************** SECTION FILTER OCASIONES *****************/

    var boxOcasionItem = $('.section-filter_recipes .section-filter_recipes-box .section-filter_recipes-slider .section-filter_recipes-slider-items');

    boxOcasionItem.on(clickEventFilter, function () {

        var myFilters = '';

        $('.section-filter_second .section-filter_second-choosen_box a').each(function (n) {

            var dataType = $(this).attr('data-type');
            var dataFilter = $(this).attr('data-filter');

            if (dataFilter !== undefined) {
                myFilters = myFilters + '[data-' + dataType + '="' + dataFilter + '"]';
            }

        });

        if ($(this).hasClass('active')) {
 
            $(this).removeClass('active');
            $('#pagination-all_recipes a').hide();

            $('#pagination-all_recipes a' + myFilters).filter(function () {
                $(this).show();
            });

        } else {

            boxOcasionItem.removeClass('active');
            $(this).addClass('active');
            var dataFilter = $(this).attr('data-ocasion');
        }

        myFilters = myFilters.replace('undefined', '');

        if ($.trim(myFilters) == '' || myFilters == ' ') {
        
            $('#pagination-all_recipes a').show();
  
            $('#pagination-all_recipes a').each(function (n) {
                var myOcasion = $(this).attr('data-ocasion');
                var result = myOcasion.search(dataFilter);

                if(result == -1) {
                    $(this).hide();
                } else if (result == 0){
                    $(this).show();
                }

            });

        } else {

            $('#pagination-all_recipes a').hide();
            $('#pagination-all_recipes a' + myFilters).filter(function () {
                var myOcasion = $(this).attr('data-ocasion');
                var result = myOcasion.search(dataFilter);

                if(result !== -1) {
                    $(this).show();
                }

            });

        }

        if (isBreakPoint(1024)) {

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 4 === 0;
                })
                .css('margin-right', '1.5%');

        } else if(isBreakPoint(960)) {

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .css({'margin-right':'2%', 'width':'32%'});

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 3 === 0;
                })
                .css('margin-right', '0');

        } else if(isBreakPoint(768)) {

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .css({'margin-right':'4%', 'width':'48%'});

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 2 === 0;
                })
                .css('margin-right', '0');

        } else if(isBreakPoint(480)) {

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .css({'margin-right':'0', 'width':'100%'});

        } else {

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .css('margin-right', '2%');

            $("#pagination-all_recipes > a")

                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 4 === 0;
                })
                .css('margin-right', '0');

        }

        var flag;

        if ( $("#pagination-all_recipes > a.section-column_x4-box-items:visible").length === 0) {
            flag = 1;
        };

        $('.section-column_x4-all_recipes > .body-font-box').hide();

        if(flag == 1) {
            $('.section-column_x4-all_recipes > .body-font-box').show();
            $('#pagination-all_recipes>a').show();
        }

    });

    var swiper5 = new Swiper('.section-filter_recipes-box', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.section-filter_recipes-box-paggination',
            clickable: true,
        },
        preloadImages: false,
        preventClicks: false,
        lazy: {
            loadPrevNext: true,
            loadOnTransitionStart: true,
        },
        breakpointsInverse: true,
        breakpoints: {
            320: {
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerGroup: 2,
                slidesPerView: 2.3,
                spaceBetween: 8,
            },
            481: {
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerGroup: 3,
                slidesPerView: 3.15,
                spaceBetween: 12,
            },
            769: {
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerGroup: 3,
                slidesPerView: 3,
                spaceBetween: 18,
            },
            1025: {
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerGroup: 4,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /***************** end SECTION FILTER OCASIONES *****************/


    /***************** SECTION FILTER INGREDIENTES / MOMENTOS *****************/

    var boxFilterSecond = $('.section-filter_second .section-filter_second-box');
    var boxFilterSecondLinks = $('.section-filter_second .section-filter_second-box .section-filter_second-box-list .section-filter_second-box-list-items a');
    var boxFilterSecondButton = $('.section-filter_second .section-filter_second-box .section-filter_second-box-buttom');
    var boxFilterSecondChoosen = $('.section-filter_second .section-filter_second-choosen_box');

    /*** Abrir / Cerrar box filter ***/

    $('.section-filter_second-link').on(clickEventFilter, function () {

        boxFilterSecond.toggleClass('active');
        $('body').toggleClass('filter-active');

    });

    $('.section-filter_second .section-filter_second-box .section-filter_second-box-close').on(clickEventFilter, function () {

        boxFilterSecond.toggleClass('active');
        $('body').toggleClass('filter-active');

    });

    /*** end Abrir box filter ***/

    /*** Activar filter y crear filter box y viceversa ***/

    boxFilterSecondLinks.on(clickEventFilter, function () {

        if ($(this).hasClass('active')) {

            $(this).removeClass('active');

        } else {

            if ($(this).parents('ul').find('a.active').length) {
                $(this).parents('ul').find('a').removeClass('active');
            }

            $(this).addClass('active');
        }

    });

    boxFilterSecondButton.on(clickEventFilter, function () {

        var boxFilterSecondLinksActive = $('.section-filter_second-box .section-filter_second-box-list .section-filter_second-box-list-items a.active');

        boxFilterSecondChoosen.empty();
        boxFilterSecondLinksActive.each(function (n) {
            $(this).clone().appendTo(boxFilterSecondChoosen);
        });

        var boxFilterSecondChoosenLink = $('.section-filter_second .section-filter_second-choosen_box a');
        
        boxFilterSecondChoosenLink.addClass('section-filter_second-choosen_box-items');

        var allRecipes = $('#pagination-all_recipes a');
        var myFilters = ''

        if ($('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').length) {
            var dataFilterOcasion = $('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').attr('data-ocasion');
        }

        boxFilterSecond.toggleClass('active');
        $('body').toggleClass('filter-active');

        boxFilterSecondChoosenLink.each(function (n) {

            var dataType = $(this).attr('data-type');
            var dataFilter = $(this).attr('data-filter');

            if (dataFilter !== undefined) {
               myFilters = myFilters + '[data-' + dataType + '="' + dataFilter + '"]';
            }

        });

        myFilters = myFilters.replace('undefined', '');

        if ($.trim(myFilters) == '' || myFilters == ' ') {

            $('#pagination-all_recipes a').show();
            $('#pagination-all_recipes a').each(function (n) {

                var myOcasion = $(this).attr('data-ocasion');
                var result = myOcasion.search(dataFilterOcasion);

                if(result == -1) {
                    $(this).hide();
                } else if (result == 0){
                   $(this).show();
                }

            });

        } else {

            $('#pagination-all_recipes a').hide();
            $('#pagination-all_recipes a' + myFilters).filter(function () {

                var myOcasion = $(this).attr('data-ocasion');
                var result = myOcasion.search(dataFilterOcasion);

                if(result !== -1) {
                    $(this).show();
                }
            });
        }

        $('.section-filter_second-choosen_box a').on(clickEventFilter, function () {

            var boxFilterSecondChoosenAttr = $(this).attr('data-filter');

            $("[data-filter=" + boxFilterSecondChoosenAttr + "]").removeClass('active');

            $(this).remove();

            if ($('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').length) {
                var dataFilterOcasion = $('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').attr('data-ocasion');
            }

            boxFilterSecondChoosenLink.each(function (n) {

                var dataType = $(this).attr('data-type');
                var dataFilter = $(this).attr('data-filter');

                if (dataFilter !== undefined) {
                    myFilters = myFilters + '[data-' + dataType + '="' + dataFilter + '"]';
                }

            });

            if ($.trim($('.section-filter_second-choosen_box').html()) == '' && ($('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').length == 0)) {

                $('#pagination-all_recipes a').show();

            } else {

                $('#pagination-all_recipes a').hide();

                if ($('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').length) {

                    var dataFilterOcasion = $('.section-filter_recipes-slider a.section-filter_recipes-slider-items.active').attr('data-ocasion');

                    $('#pagination-all_recipes a').each(function (n) {

                        var myOcasion = $(this).attr('data-ocasion');
                        var result = myOcasion.search(dataFilterOcasion);

                        if(result == -1) {
                            $(this).hide();
                        } else if (result == 0){
                            $(this).show();
                        }

                    });

                } else {

                    $('#pagination-all_recipes a' + myFilters).filter(function () {

                        var myOcasion = $(this).attr('data-ocasion');
                        var result = myOcasion.search(dataFilterOcasion);

                        if(result !== -1) {
                            $(this).show();
                        }
                    });
                }
            }

        });

        if (isBreakPoint(1024)) {

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 4 === 0;
                })
                .css('margin-right', '1.5%');

        } else if(isBreakPoint(960)) {

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .css({'margin-right':'2%', 'width':'32%'});

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 3 === 0;
                })
                .css('margin-right', '0');

        } else if(isBreakPoint(768)) {

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .css({'margin-right':'4%', 'width':'48%'});

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 2 === 0;
                })
                .css('margin-right', '0');

        } else if(isBreakPoint(480)) {

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .css({'margin-right':'0', 'width':'100%'});

        } else {

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .css('margin-right', '2%');

            $("#pagination-all_recipes > a")
                .filter(':visible')
                .filter(function(i) {
                    return (i + 1) % 4 === 0;
                })
                .css('margin-right', '0');

        }

        var flag;
        if ( $("#pagination-all_recipes > a.section-column_x4-box-items:visible").length === 0) {
            flag = 1;
        };

        $('.section-column_x4-all_recipes > .body-font-box').hide();
        if(flag == 1) {
            $('.section-column_x4-all_recipes > .body-font-box').show();
            $('#pagination-all_recipes>a').show();
        }

    });

    /*** end Activar filter y crear filter box y viceversa ***/

    /***************** end SECTION FILTER INGREDIENTES / MOMENTOS *****************/


    /***************** SECTION TEMPLATE RECIPE  *****************/

    /*** Aplicar mismo ancho a divs Recetas y RRSS + REVIEWS ***/

    var RecipePrincipal = $('.section-recipe-a .section-recipe-box');
    var RecipeIngredients = $('.section-recipe-b .section-recipe-description');
    var RecipePrincipalContent = $('.section-recipe-a .section-recipe-box .section-recipe-box-content');
    var RecipeReviewsRRSSPrincipalContent = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-others');

    var RecipePrincipalMargin = RecipePrincipal.outerWidth(true);
    RecipePrincipalMargin = RecipePrincipalMargin / 2;

    var RecipeIngredientsMargin = RecipeIngredients.outerWidth(true);
    RecipeIngredientsMargin = RecipeIngredientsMargin / 2;

    var RecipeMargin = RecipePrincipalMargin - RecipeIngredientsMargin;

    RecipePrincipalContent.css('padding-left', RecipeMargin);
    RecipeReviewsRRSSPrincipalContent.css('left', RecipeMargin);

    var width = $(window).width();

    $(window).on('resize', function () {

        if ($(this).width() != width) {

            var RecipePrincipalMargin = RecipePrincipal.outerWidth(true);
            RecipePrincipalMargin = RecipePrincipalMargin / 2;

            var RecipeIngredientsMargin = RecipeIngredients.outerWidth(true);
            RecipeIngredientsMargin = RecipeIngredientsMargin / 2;

            var RecipeMargin = RecipePrincipalMargin - RecipeIngredientsMargin;

            RecipePrincipalContent.css('padding-left', RecipeMargin);
            RecipeReviewsRRSSPrincipalContent.css('left', RecipeMargin);

        }

    })

    /*** end Aplicar mismo ancho a divs Recetas y RRSS + REVIEWS  ***/

    /*** Recoger data level y poner clase de level ***/

    function elementVisible(recipeLevel) {

        var recipeLevel = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-feature .section-recipe-box-content-feature-level .section-recipe-box-content-feature-level-img');
        var recipeLevelAttr = recipeLevel.attr('data-level');
        var visible = false;
        var windowTop = $(document).scrollTop();
        var windowBottom = windowTop + window.innerHeight;
        var elementPositionTop = recipeLevel.offset().top;
        var elementPositionBottom = elementPositionTop + recipeLevel.height();

        if ((elementPositionTop <= windowBottom) && (elementPositionBottom >= windowTop) && (visible == false)) {
            recipeLevel.addClass(recipeLevelAttr);
            visible = true;
        }
    }

    if ($('body').hasClass('page-recetas-detalle')) {
        elementVisible();
        $(window).scroll(function () {
            elementVisible();
        });
    }

    /*** end Recoger data level y poner clase de level ***/

    /*** Toggle Nutrientes ***/

    var btnNutrientes = $('.section-recipe .section-recipe-description .section-recipe-description-info .section-recipe-description-info-nutrition .section-recipe-description-info-nutrition-title');
    var boxContentNutrientes = $('.section-recipe .section-recipe-description .section-recipe-description-info .section-recipe-description-info-nutrition .section-recipe-description-info-nutrition-body');

    btnNutrientes.on(clickEventFilter, function () {

        var width = $(window).width();

        if (width < 481) {
            btnNutrientes.toggleClass('active');
            boxContentNutrientes.slideToggle();
        }

    });

    $(window).on('resize', function () {

        var width = $(window).width();

        if (width > 481) {
            btnNutrientes.addClass('active');
            boxContentNutrientes.css('display', 'block');
        }

    });

    /*** end Toggle Nutrientes ***/

    /*** RRSS ***/

    function getlink() {
        var urlPage = window.location.href;
        var aux = document.createElement("input");
        aux.setAttribute("value", urlPage);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
    }

    var btnShareRRSS = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-others .section-recipe-box-content-others-share .section-recipe-box-content-others-share-text');
    var boxShareRRSS = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-others .section-recipe-box-content-others-share .section-recipe-box-content-others-share-box');

    btnShareRRSS.on(clickEventFilter, function () {

        if (boxShareRRSS.hasClass('active')) {

            boxShareRRSS.removeClass('active');
            boxShareRRSS.addClass('not-active');

        } else {

            boxShareRRSS.removeClass('not-active');
            boxShareRRSS.addClass('active');

        }

    });

    var urlPage = window.location.href;
    var btnShareFacebook = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-others .section-recipe-box-content-others-share .section-recipe-box-content-others-share-box a.section-recipe-box-content-others-share-box-facebook');
    var boxShareLink = $('.section-recipe .section-recipe-box .section-recipe-box-content .section-recipe-box-content-others .section-recipe-box-content-others-share .section-recipe-box-content-others-share-box a.section-recipe-box-content-others-share-box-link');

    btnShareFacebook.attr('href', 'https://www.facebook.com/dialog/share?app_id=1012213189166443&display=popup&href=' + urlPage);
    btnShareFacebook.attr('target', '_blank');

    boxShareLink.on(clickEventFilter, function () {
        getlink();
    });

    /*** end RRSS ***/

    /***************** end SECTION TEMPLATE RECIPE  *****************/


    /*****************  SECTION SUBNAV *****************/

    var swiperSubnav = new Swiper('.section-subnav-slider', {
        scrollbar: {
            el: '.section-subnav-slider-scrollbar',
            hide: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                cssWidthAndHeight: true,
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                preventClicks: true,
                slidesOffsetAfter: 24,
                slidesOffsetBefore: 24,
                slidesPerView: 'auto',
                spaceBetween: 24,
                centerInsufficientSlides: false,
            },
            480: {
                cssWidthAndHeight: true,
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                preventClicks: true,
                slidesOffsetAfter: 24,
                slidesOffsetBefore: 24,
                slidesPerView: 'auto',
                spaceBetween: 24,
                centerInsufficientSlides: true,
            },
            769: {
                cssWidthAndHeight: true,
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 'auto',
                spaceBetween: 40,
            },
        }
    });

    var subnav = $('.section-subnav');
    var subnavSlider = $('.section-subnav .section-subnav-slider .section-subnav-slider-inner');
    var subnavSliderItems = $('.section-subnav .section-subnav-slider .section-subnav-slider-inner .section-subnav-slider-inner-items');

    var subnavSliderWidth = 0;

    subnavSliderItems.each(function (index) {

        subnavSliderWidth += parseInt($(this).outerWidth(true), 10);

    });

    if (width > 768) {

        subnavSlider.addClass('initial-not-slider');
        subnavSlider.css('width', 'inherit');

    } else if (width <= 768 && subnavSliderWidth <= 300) {

        subnavSlider.addClass('initial-not-slider');
        subnavSlider.css('width', 'inherit');
        subnavSlider.css('display', 'block');

    } else {

        subnavSlider.removeClass('initial-not-slider');

        var subnavSliderWidth = 0;

        subnavSliderItems.each(function (index) {

            subnavSliderWidth += parseInt($(this).outerWidth(true), 10);

        });

        subnavSlider.css('width', subnavSliderWidth)

    }

    $(window).on('resize', function () {

        var subnavSliderWidth = 0;

        subnavSliderItems.each(function (index) {

            subnavSliderWidth += parseInt($(this).outerWidth(true), 10);

        });

        var width = $(window).width();
        var subnavSlider = $('.section-subnav .section-subnav-slider .section-subnav-slider-inner');

        if (width > 768) {

            subnavSlider.addClass('initial-not-slider');
            subnavSlider.css('width', 'inherit')

        } else if (width <= 768 && subnavSliderWidth <= 300) {

            subnavSlider.addClass('initial-not-slider');
            subnavSlider.css('width', 'inherit');
            subnavSlider.css('display', 'block');

        } else {

            subnavSlider.removeClass('initial-not-slider');

            var subnavSliderWidth = 0;

            subnavSliderItems.each(function (index) {

                subnavSliderWidth += parseInt($(this).outerWidth(true), 10);

            });

            subnavSlider.css('width', subnavSliderWidth)

        }

    });

    /*** STICKY MENU & SUBMENU ***/

    var subnav = $('.section-subnav');
    var header = $('.section-header');
    var headerHeight, subnavHeight, lastTop, subnavPosition;

    subnav.addClass('not-active');

    headerHeight = header.outerHeight();
    if (subnav.length) {
        subnavHeight = subnav.outerHeight();
        subnavPosition = subnav.offset().top;
    } else {
        subnavHeight = 0
    }

    $('body').not('.header-opacity').css('paddingTop', headerHeight + subnavHeight);

    subnav.css('top', headerHeight);

    var objTop = $(window).scrollTop();

    $(window).scroll(function () {

        var objActTop = $(this).scrollTop();
        objTop = objActTop;

        if (objActTop > headerHeight) {

            if (lastTop < objTop && objActTop > 0) {

                // scroll down
                header.addClass('active-fixed');
                subnav.css('top', 0);

                if (subnav.hasClass('not-active')  && objActTop >= subnavPosition) {
                    subnav.removeClass('not-active');
                }


            } else if (lastTop > objTop && !(objActTop <= headerHeight)) {

                // scroll up
                header.removeClass('active-fixed');
                header.addClass('active-home-nav');
                subnav.css('top', headerHeight);

                if ( $('body').hasClass('header-opacity') && objActTop < subnavPosition - headerHeight) {
                    subnav.addClass('not-active');
                }

            }

            lastTop = objTop;

        } else {

            // scroll 0
            header.removeClass('active-fixed');
            header.removeClass('active-home-nav');
            subnav.css('top', headerHeight);
        }

    });

    $(window).on('resize', function () {

        var timeId;
        clearTimeout(timeId);
        timeId = setTimeout(navRelay, 500);

    });

    function navRelay() {

        var width = $(window).width();
        headerHeight = header.outerHeight();

        if (subnav.length) {
            subnavHeight = subnav.outerHeight();

        } else {
           subnavHeight = 0
        }

        $('body').not('.header-opacity').css('paddingTop', headerHeight + subnavHeight);

        header.removeClass('active-fixed');
        header.addClass('active-home-nav');
        subnav.css('top', headerHeight);

    }

    /*** end STICKY MENU & SUBMENU ***/

    /*** SUBNAV ACTIVE ***/

    var subnavItemsLink = $('.section-subnav .section-subnav-slider .section-subnav-slider-inner .section-subnav-slider-inner-items .section-subnav-slider-inner-items-links');

    subnavItemsLink.each(function () {

        var urlPageLink = this.href.split("/").reverse()[0];

        if (urlPageLink == urlPageCurrent) {
            $(this).addClass("active");
        }

    });

    /*** end SUBNAV ACTIVE ***/

    /***************** end SECTION SUBNAV *****************/


    /***************** SECTION  COLUMNX4-SCROLL_RESP - CATEGORY BLOG *****************/

    /*** CATEGORY BLOG 1 ***/

    var swipercategoryblog1 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-1', {
        scrollbar: {
            el: '.section-column_x4_scroll-blog-category-1-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 1 ***/

    /*** CATEGORY BLOG 2 ***/

    var swipercategoryblog2 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-2', {
        scrollbar: {
            el: '.section-column_x4_scroll-blog-category-2-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 2 ***/

    /*** CATEGORY BLOG 3 ***/

    var swipercategoryblog3 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-3', {
        scrollbar: {
            el: '.section-column_x4_scroll-blog-category-3-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 3 ***/

    /*** CATEGORY BLOG 4 ***/

    var swipercategoryblog4 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-4', {

       scrollbar: {
            el: '.section-column_x4_scroll-blog-category-4-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 4 ***/


    /*** CATEGORY BLOG 5 ***/

    var swipercategoryblog5 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-5', {
        scrollbar: {
            el: '.section-column_x4_scroll-blog-category-5-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 5 ***/

    /*** CATEGORY BLOG 6 ***/

    var swipercategoryblog6 = new Swiper('.section-column_x4_scroll-box-popular_blog-category-6', {
        scrollbar: {
            el: '.section-column_x4_scroll-blog-category-6-scrollbar',
            hide: false,
        },
        preloadImages: false,
        lazy: {
            loadPrevNext: true,
        },
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 1.4,
                spaceBetween: 14,
            },
            481: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.5,
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                hide: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 2.9,
                spaceBetween: 18,
            },
            961: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 12,
            },
            1025: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 18,
            },
            1201: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                hide: true,
                slidesPerView: 4,
                spaceBetween: 24,
            },
        }
    });

    /*** end CATEGORY BLOG 6 ***/

    /***************** end SECTION COLUMNX4-SCROLL_RESP - CATEGORY BLOG *****************/


    /***************** SECTION OUTSTANDING NEWS *****************/

    var newsDestacadaItem = $('.section-outstanding_news .section-outstanding_news-box .section-outstanding_news-box-inner .section-outstanding_news-box-inner-item');

    newsDestacadaItem.each(function (item) {

        var dataAlign = $(this).attr('data-align');

        $(this).css('background-position', 'center ' + dataAlign);

    });

    var newsDestacada = $('.section-outstanding_news');

    if (width > 768) {
        newsDestacada.addClass('not-outstanding_news-swipper');
    }

    $(window).on('resize', function () {

        var newsDestacada = $('.section-outstanding_news');
        var width = $(window).width();

        if ((width > 768) && (!newsDestacada.hasClass('not-outstanding_news-swipper'))) {

            newsDestacada.addClass('not-outstanding_news-swipper');

        } else if (width <= 768) {

            newsDestacada.removeClass('not-outstanding_news-swipper');

        }

    });


    var swiperOutstandingNews = new Swiper('.section-outstanding_news-box', {
        scrollbar: {
            el: '.section-outstanding_news-box-scrollbar',
        },
        hide: false,
        preventClicks: false,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                allowSlideNext: true,
                allowSlidePrev: true,
                allowTouchMove: true,
                cssWidthAndHeight: true,
                preventClicks: true,
                slidesOffsetAfter: 0,
                slidesOffsetBefore: 0,
                slidesPerView: 'auto',
                spaceBetween: 12,
            },
            769: {
                allowSlideNext: false,
                allowSlidePrev: false,
                allowTouchMove: false,
                cssWidthAndHeight: true,
                slidesPerView: 'auto',
            },
        }
    });

    /***************** end SECTION OUTSTANDING NEWS *****************/


    /***************** SECTION ALL GRID - CATEGORY BLOG *****************/

    /* pagination */

    $(function () {

        $('#pagination-grid-blog').easyPaginate({
            paginateElement: 'a.section-grid-box-items',
            elementsPerPage: 8,
            prevButtonText: '',
            nextButtonText: '',
            effect: 'default'
        });

        $('.lazy').Lazy({
            visibleOnly: true,
        });

    });

    /* end pagination */

    /* data alignimg */

    var BlogCategoryItem = $('.section-grid .section-grid-box .section-grid-box-items');

    BlogCategoryItem.each(function (item) {

        var dataAlignImg = $(this).attr('data-alignimg');

        $(this).addClass('img-' + dataAlignImg);

    });

    /* end data alignimg */

    /***************** end SECTION ALL GRID - CATEGORY BLOG *****************/


    /***************** SECTION POST *****************/

    /*** RRSS ***/

    var boxPostContent = $('.section-post .section-post-box');
    var boxPostImg = $('.section-post .section-post-img');
    var boxPostShareRRSS = $('.section-post .section-post-box .section-post-box-share');

    var btnPostShareFacebook = $('.section-post .section-post-box .section-post-box-share .section-post-box-share-facebook');
    var boxPostShareLink = $('.section-post .section-post-box .section-post-box-share .section-post-box-share-link');

    btnPostShareFacebook.attr('href', 'https://www.facebook.com/dialog/share?app_id=1012213189166443&display=popup&href=' + urlPage);
    btnPostShareFacebook.attr('target', '_blank');

    boxPostShareLink.on(clickEventFilter, function () {
        getlink();
    });


    function scrollRRSS() {

        if (boxPostContent.length && width > 768) {

            $('.section-post .section-post-img img:first-child').on('load', function () {

                var boxPostImgHeight = boxPostImg.outerHeight();
                var boxPostContentHeight = boxPostContent.outerHeight();
                var boxPostContentPosition = boxPostContent.offset().top;
                var boxPostShareRRSSHeight = boxPostShareRRSS.outerHeight();
                var boxPostShareRRSSPosition = boxPostShareRRSS.offset().top;

                var windowTop = $(window).scrollTop();

                var windowsTopActTop = $(this).scrollTop();

                windowTop = windowsTopActTop;

                if (windowsTopActTop >= boxPostContentPosition - boxPostImgHeight / 2 && windowsTopActTop <= boxPostContentPosition + boxPostContentHeight - boxPostShareRRSSHeight * 3) {

                    boxPostShareRRSS.css('top', windowsTopActTop - boxPostShareRRSSPosition + boxPostImgHeight / 2 + 20);

                }

                windowsTop = windowsTopActTop;

                $(window).scroll(function () {

                    var windowsTopActTop = $(this).scrollTop();

                    windowTop = windowsTopActTop;

                    if (windowsTopActTop >= boxPostContentPosition - boxPostImgHeight / 2 && windowsTopActTop <= boxPostContentPosition + boxPostContentHeight - boxPostShareRRSSHeight * 3) {

                        boxPostShareRRSS.css('top', windowsTopActTop - boxPostShareRRSSPosition + boxPostImgHeight / 2);

                    }

                    windowsTop = windowsTopActTop;

                });

            })

        }

    };

    scrollRRSS();

    $(window).on('resize', function () {

        scrollRRSS();

    });

    /*** end RRSS ***/

    /***************** end SECTION POST *****************/


    /***************** SECTION RANGE ACEITE - AWARDS *****************/

    var btnAwards = $('.section-range-awards.section-range .section-range-box .section-range-box-col_right .section-range-box-col_right-extra .section-range-box-col_right-extra-btn');
    var btnCloseAwards = $('.section-range-awards.section-range .section-range-box .section-range-box-col_right .section-range-box-col_right-extra .section-range-box-col_right-extra-box .section-range-box-col_right-extra-btn-close');
    var boxAwards = $('.section-range-awards.section-range .section-range-box .section-range-box-col_right .section-range-box-col_right-extra .section-range-box-col_right-extra-box');

    btnAwards.on(clickEventFilter, function () {

        btnAwards.delay(250).fadeToggle();
        boxAwards.toggleClass('active');

    });

    btnCloseAwards.on(clickEventFilter, function () {

        btnAwards.delay(250).fadeToggle();
        boxAwards.toggleClass('active');

    });

    /***************** end SECTION RANGE ACEITE - AWARDS *****************/


    /***************** SECTION CARROUSEL PRODUCTS *****************/

    var sliderProduct = $('.section-slider_products .section-slider_products-box');
    var indexSlider = 1;

    sliderProduct.each(function(indexSlider, element){

        indexSlider++;

        $(this).addClass('.section-slider_products-box-' + indexSlider);
        $(this).find('.swiper-button-prev').addClass('swiper-button-prev-' + indexSlider);
        $(this).find('.swiper-button-next').addClass('swiper-button-next-' + indexSlider);
        $(this).find('.section-slider_products-box-paggination').addClass('section-slider_products-box-paggination-' + indexSlider);

        var sliderName = '.section-slider_products-box-' + indexSlider; 
        
        var swiperProduct = new Swiper(this, {
            navigation: {
                nextEl: '.swiper-button-next-' + indexSlider,
                prevEl: '.swiper-button-prev-' + indexSlider,
            },
            pagination: {
                el: '.section-slider_products-box-paggination-' + indexSlider,
                clickable: true,
            },
            preloadImages: false,
            preventClicks: false,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
            },
            breakpointsInverse: true,
            breakpoints: {
                320: {
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerGroup: 1,
                    slidesPerView: 1,
                    spaceBetween: 8,
                    pagination: false,
                },
                481: {
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerGroup: 2,
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                769: {
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                    spaceBetween: 14,
                },
                1025: {
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1200: {
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerGroup: 3,
                    slidesPerView: 3,
                    spaceBetween: 49,
                },
            }
        });

        sliderProductsFunction($(this), indexSlider, swiperProduct);

    });

    $(window).on('resize', function () {

        var sliderProduct = $('.section-slider_products .section-slider_products-box');
        var indexSlider = 1;

        sliderProduct.each(function(indexSlider, element){

            indexSlider++;

            $(this).addClass('.section-slider_products-box-' + indexSlider);
            $(this).find('.swiper-button-prev').addClass('swiper-button-prev-' + indexSlider);
            $(this).find('.swiper-button-next').addClass('swiper-button-next-' + indexSlider);
            $(this).find('.section-slider_products-box-paggination').addClass('section-slider_products-box-paggination-' + indexSlider);

            var sliderName = '.section-slider_products-box-' + indexSlider; 
            
            var swiperProduct = new Swiper(this, {
                navigation: {
                    nextEl: '.swiper-button-next-' + indexSlider,
                    prevEl: '.swiper-button-prev-' + indexSlider,
                },
                pagination: {
                    el: '.section-slider_products-box-paggination-' + indexSlider,
                    clickable: true,
                },
                preloadImages: false,
                preventClicks: false,
                lazy: {
                    loadPrevNext: true,
                    loadOnTransitionStart: true,
                },
                breakpointsInverse: true,
                breakpoints: {
                    320: {
                        slidesOffsetAfter: 0,
                        slidesOffsetBefore: 0,
                        slidesPerGroup: 1,
                        slidesPerView: 1,
                        spaceBetween: 8,
                        pagination: false,
                    },
                    481: {
                        slidesOffsetAfter: 0,
                        slidesOffsetBefore: 0,
                        slidesPerGroup: 2,
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    769: {
                        slidesOffsetAfter: 0,
                        slidesOffsetBefore: 0,
                        slidesPerGroup: 3,
                        slidesPerView: 3,
                        spaceBetween: 14,
                    },
                    1025: {
                        slidesOffsetAfter: 0,
                        slidesOffsetBefore: 0,
                        slidesPerGroup: 3,
                        slidesPerView: 3,
                        spaceBetween: 24,
                    },
                    1200: {
                        slidesOffsetAfter: 0,
                        slidesOffsetBefore: 0,
                        slidesPerGroup: 3,
                        slidesPerView: 3,
                        spaceBetween: 49,
                    },
                }
            });

            sliderProductsFunction($(this), indexSlider, swiperProduct);

        });

    });

    function sliderProductsFunction(that, indexSlider, swiperProduct) {

        var sliderItemProduct = that.find('.section-slider_products-box-inner-items');
        var numSliderItemProduct = sliderItemProduct.length;
        var width = $(window).width();        
        if (width > 768 && numSliderItemProduct <= 3) {

            that.addClass("disabled");

        } else if (width > 480 && width < 769 && numSliderItemProduct <= 2) {

            that.addClass("disabled");

        } else if (width < 481 && numSliderItemProduct == 1) {

            that.addClass("disabled");

        } else if (width < 481 && numSliderItemProduct > 1) {

            that.find('.section-slider_products-box-inner-items-img-count').remove();

            var countSlider = numSliderItemProduct;
            var countSliderCurrent = 1;

            var contentCount = '<div class="section-slider_products-box-inner-items-img-count"><p>' + countSliderCurrent + '/' + countSlider + '</p></div>';

            sliderItemProduct.prepend(contentCount);

            swiperProduct.on('slideNextTransitionStart', function () {

                countSliderCurrent = countSliderCurrent + 1;

                that.find('.section-slider_products-box-inner-items-img-count').remove();

                var contentCount = '<div class="section-slider_products-box-inner-items-img-count"><p>' + countSliderCurrent + '/' + countSlider + '</p></div>';

                sliderItemProduct.prepend(contentCount);

            });

            swiperProduct.on('slidePrevTransitionStart', function () {

                countSliderCurrent = countSliderCurrent - 1;

                 that.find('.section-slider_products-box-inner-items-img-count').remove();

                var contentCount = '<div class="section-slider_products-box-inner-items-img-count"><p>' + countSliderCurrent + '/' + countSlider + '</p></div>';

                sliderItemProduct.prepend(contentCount);

            });

        } else if (width > 480) {

            that.find('.section-slider_products-box-inner-items-img-count').remove();

        }

    }

        /***************** Lightbox product *****************/

        var btnVerMasProductSlider = $('.section-slider_products .section-slider_products-box-inner-items .section-slider_products-box-inner-items-box_link');
        var btnCloseVerMasProductSlider = $('.section-slider_products .section-slider_products-lightbox .section-slider_products-lightbox-close');
        var boxProductSliderLightBox = $('.section-slider_products .section-slider_products-lightbox');
        var boxProductSliderImgLightBox = $('.section-slider_products .section-slider_products-lightbox .section-slider_products-lightbox-box-img');
        var boxProductSliderTitleLightBox = $('.section-slider_products .section-slider_products-lightbox .section-slider_products-lightbox-box-content-title');
        var boxProductSliderContentLightBox = $('.section-slider_products .section-slider_products-lightbox .section-slider_products-lightbox-box-content-body');

        btnVerMasProductSlider.on(clickEventFilter, function (evt) {

            evt.preventDefault();

            var imgUrlProductLightBox = $(this).parents('.section-slider_products-box-inner-items').find('.section-slider_products-box-inner-items-description').attr('data-src-img');
            var titleProductLightBox = $(this).parents('.section-slider_products-box-inner-items').find('.section-slider_products-box-inner-items-title').text();
            var descriptionProductLightBox = $(this).parents('.section-slider_products-box-inner-items').find('.section-slider_products-box-inner-items-description').html();

            boxProductSliderImgLightBox.empty().html('<img src="' + imgUrlProductLightBox + '" alt="' + titleProductLightBox + '" title="' + titleProductLightBox + '">');
            boxProductSliderTitleLightBox.empty().text(titleProductLightBox);
            boxProductSliderContentLightBox.empty().html(descriptionProductLightBox);

            boxProductSliderLightBox.addClass('active')

        });

        btnCloseVerMasProductSlider.on(clickEventFilter, function (evt) {

            evt.preventDefault();
            boxProductSliderLightBox.removeClass('active');

        });

            /*** Lightbox product RANGE ACEITE ES ***/

            var buttonRangeAwardsES = $('.page-es .section-range-awards .section-range-box-col_left-btn');

            buttonRangeAwardsES.on(clickEventFilter, function (evt) {

                var magnaOliveEs = $(".page-es .section-slider_products-vidrio #magnaOliva.section-slider_products-box-inner-items")

                evt.preventDefault();

                var imgUrlProductLightBox = magnaOliveEs.find('.section-slider_products-box-inner-items-description').attr('data-src-img');
                var titleProductLightBox = magnaOliveEs.find('.section-slider_products-box-inner-items-title').text();
                var descriptionProductLightBox = magnaOliveEs.find('.section-slider_products-box-inner-items-description').html();

                boxProductSliderImgLightBox.empty().html('<img src="' + imgUrlProductLightBox + '" alt="' + titleProductLightBox + '" title="' + titleProductLightBox + '">');
                boxProductSliderTitleLightBox.empty().text(titleProductLightBox);
                boxProductSliderContentLightBox.empty().html(descriptionProductLightBox);

                boxProductSliderLightBox.addClass('active')

            });

            var buttonRangesEcologicES = $('.page-es .section-range-ecologic .section-range-box-col_left-btn');

            buttonRangesEcologicES.on(clickEventFilter, function (evt) {

                var extraOliveEcologiceEs = $(".page-es .section-slider_products-aceite #virgenExtraEcologic.section-slider_products-box-inner-items")

                evt.preventDefault();

                var imgUrlProductLightBox = extraOliveEcologiceEs.find('.section-slider_products-box-inner-items-description').attr('data-src-img');
                var titleProductLightBox = extraOliveEcologiceEs.find('.section-slider_products-box-inner-items-title').text();
                var descriptionProductLightBox = extraOliveEcologiceEs.find('.section-slider_products-box-inner-items-description').html();

                boxProductSliderImgLightBox.empty().html('<img src="' + imgUrlProductLightBox + '" alt="' + titleProductLightBox + '" title="' + titleProductLightBox + '">');
                boxProductSliderTitleLightBox.empty().text(titleProductLightBox);
                boxProductSliderContentLightBox.empty().html(descriptionProductLightBox);

                boxProductSliderLightBox.addClass('active')

            });


            /*** end Lightbox product RANGE ACEITE ES ***/

        /***************** end Lightbox product *****************/

    /***************** end SECTION CARROUSEL PRODUCTS *****************/


    /***************** SECTION CONTACT *****************/

    if ($('html').attr('lang') == 'es') {

        $('#form-contact').validate({
            rules: {
                'name': {
                    required: true,
                },
                'pais': {
                    required: true,
                },
                'email': {
                    required: true,
                    email: true
                },
                'comments': {
                    required: true,
                    maxlength: 500,
                },
                'check-legal': {
                    required: true,
                }
            },
            messages: {
                'name': {
                    required: 'Introduce tu nombre y apellido.',
                },
                'pais': {
                    required: 'Seleccione un país',
                },
                'email': {
                    required: 'Introduce un email.',
                    email: 'Introduce un de email válido.'
                },
                'comments': {
                    required: 'Introduce un comentario.',
                    maxlength: 'A llegado al máximo de carácteres posible',
                },
                'check-legal': {
                    required: 'Acepta la Política de Privacidad'
                }
            }
        });

    } else if ($('html').attr('lang') == 'en') {

        $('#form-contact').validate({
            rules: {
                'name': {
                    required: true,
                },
                'pais': {
                    required: true,
                },
                'email': {
                    required: true,
                    email: true
                },
                'comments': {
                    required: true,
                    maxlength: 200,
                },
                'check-legal': {
                    required: true,
                }
            },
            messages: {
                'name': {
                    required: 'Enter your first and last name',
                },
                'pais': {
                    required: 'Select a country',
                },
                'email': {
                    required: 'Enter an email',
                    email: 'Enter a valid email address'
                },
                'comments': {
                    required: 'Enter a comment',
                    maxlength: 'You have reached the maximum number of possible characters',
                },
                'check-legal': {
                    required: 'Accept the privacy policy'
                }
            }
        });

    }

    /***************** end SECTION CONTACT *****************/

    /***************** SECTION HISTORY *****************/

    var sectionHistory = $('.section-history');
    var sectionHistoryClose = $('.section-history .section-history-close');
    var sectionHistoryBtn = $('.section-history .section-history-box .section-history-box-content-btn');
    var sectionHistoryLightBox = $('.section-history .section-history-box .section-history-box-fixed');

    sectionHistoryBtn.on(clickEventFilter, function(evt) {

        evt.preventDefault();

        var sectionHistoryLightBoxData = $(this).attr('data-history');
        var sectionHistoryBtnId = $('[id=' + sectionHistoryLightBoxData +']');

        $('body').addClass('section-history-active');
        sectionHistoryBtnId.addClass('active');
        sectionHistoryClose.addClass('active');

    });

    sectionHistoryClose.on(clickEventFilter, function(evt) {

        evt.preventDefault();

        $('body').removeClass('section-history-active');
        sectionHistoryLightBox.removeClass('active');
        sectionHistoryClose.removeClass('active');

    });

    /***************** end SECTION HISTORY *****************/


    /***************** SECTION SLIDER HISTORY *****************/

    var container = $('.section-slider-history');

    var timelineContents = new Swiper('.section-slider-history-contents', {
        navigation: {
            nextEl: '.section-slider-history-button-next',
            prevEl: '.section-slider-history-button-prev',
        },
        grabCursor: true,
        slidesPerView: 1,
        preventClicks: false,
        spaceBetween: 0,
        autoHeight: true,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                direction:'horizontal',
            },
            769: {
                direction:'vertical',
            },
        }
    });
    var timelineDates = new Swiper('.section-slider-history-dates', {
        spaceBetween: 0,
        preventClicks: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                direction:'horizontal',
            },
            769: {
                direction:'vertical',
            },
        }
    });

     if (container.length) {
        timelineContents.controller.control = timelineDates;
        timelineDates.controller.control = timelineContents;

        var containerBackgroundHistory= $('.section-slider-history .section-slider-history-item-box-right');
        
        containerBackgroundHistory.each(function (n) {
            var containerBackgroundHistory = $(this).attr('data-background');
            containerBackgroundHistorySrc = 'url(' + containerBackgroundHistory + ')';
            $(this).css({'background-image': containerBackgroundHistorySrc});
        });

        var itemsSlide = $('.section-slider-history-dates .swiper-slide').length;

        var width = $(window).width();

        if (width > 768 && itemsSlide <= 9) {

            container.addClass('active-vertical');

        } else {

            container.removeClass('active-vertical');
            
            var containerHistoryBox = $('.section-slider-history .section-slider-history-item-box-left-inner');
            var btnReadMore = $('.section-slider-history .section-slider-history-item-box-left-inner-plus');
            var containerHistoryContent = $('.section-slider-history .section-slider-history-item-box-left-inner-body');

            containerHistoryContent.each(function () {

             var containerHistoryContentHeight =  $(this).outerHeight();

             if (containerHistoryContentHeight < 50 ){

                $(this).parent().addClass('not-height-active');

             } else {

                $(this).parent().addClass('height-active');

             }
               
            });

            var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
            $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

            timelineDates.on('slideChange', function () {
              containerHistoryBox.removeClass('active');
            });

            btnReadMore.on(clickEventFilter, function(evt) {

                evt.preventDefault();

                var thisContainerHistoryBox = $(this).parent('.section-slider-history-item-box-left-inner');
                thisContainerHistoryBox.toggleClass('active');

                if ( thisContainerHistoryBox.hasClass('active') ){

                    var thisBtnReadMoreTitle = $(this).children('.item-2').text();
                    $(this).attr('title' , thisBtnReadMoreTitle);

                     var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
                     $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

                } else{

                    var thisBtnReadMoreTitle = $(this).children('.item-1').text();
                    $(this).attr('title' , thisBtnReadMoreTitle);

                    var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
                    $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

                }

            });

        }   


    } 

    $(window).on('resize', function () {

        if (container.length) {
            timelineContents.controller.control = timelineDates;
            timelineDates.controller.control = timelineContents;

            var containerBackgroundHistory= $('.section-slider-history .section-slider-history-item-box-right');
            
            containerBackgroundHistory.each(function (n) {
                var containerBackgroundHistory = $(this).attr('data-background');
                containerBackgroundHistorySrc = 'url(' + containerBackgroundHistory + ')';
                $(this).css({'background-image': containerBackgroundHistorySrc});
            });

            var itemsSlide = $('.section-slider-history-dates .swiper-slide').length;
            var width = $(window).width();

            if (width > 768 && itemsSlide <= 9) {

                container.addClass('active-vertical');
                
            } else {

                container.removeClass('active-vertical');
                
                var containerHistoryBox = $('.section-slider-history .section-slider-history-item-box-left-inner');
                var btnReadMore = $('.section-slider-history .section-slider-history-item-box-left-inner-plus');
                var containerHistoryContent = $('.section-slider-history .section-slider-history-item-box-left-inner-body');

                containerHistoryContent.each(function () {

                 var containerHistoryContentHeight =  $(this).outerHeight();

                 if (containerHistoryContentHeight < 50 ){

                    $(this).parent().addClass('not-height-active');

                 } else {

                    $(this).parent().addClass('height-active');

                 }
                   
                });

                var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
                $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

                timelineDates.on('slideChange', function () {
                  containerHistoryBox.removeClass('active');
                });

                btnReadMore.on(clickEventFilter, function(evt) {

                    evt.preventDefault();

                    var thisContainerHistoryBox = $(this).parent('.section-slider-history-item-box-left-inner');
                    thisContainerHistoryBox.toggleClass('active');

                    if ( thisContainerHistoryBox.hasClass('active') ){

                        var thisBtnReadMoreTitle = $(this).children('.item-2').text();
                        $(this).attr('title' , thisBtnReadMoreTitle);

                         var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
                         $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

                    } else{

                        var thisBtnReadMoreTitle = $(this).children('.item-1').text();
                        $(this).attr('title' , thisBtnReadMoreTitle);

                        var contHeight = $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box .swiper-slide-active').height();
                        $('.section-slider-history .section-slider-history-contents .section-slider-history-contents-box').css('height' , contHeight);

                    }

                });

            }   
        } 

    });

    /***************** end SECTION SLIDER HISTORY*****************/


    /***************** SECTION INTRO PROCESO Y CALIDAD *****************/

    var btnIntroProcesoCalidad = $('.section-intro-proceso_calidad .section-intro-proceso_calidad-box');
    var containerProcesoCalidad = $('.section-slider-proceso_calidad');

     btnIntroProcesoCalidad.on(clickEventFilter, function(evt) {

        evt.preventDefault();

        var containerProcesoCalidadTop = containerProcesoCalidad.offset().top;

        $(document).scrollTop();

        $("html, body").animate({
            scrollTop: containerProcesoCalidadTop
        }, 1000);


    });



    /***************** end SECTION INTRO PROCESO Y CALIDAD *****************/


    /***************** SECTION SLIDER PROCESO Y CALIDAD *****************/

    var containerProcesoCalidad = $('.section-slider-proceso_calidad');

    var timelineContentsProcesoCalidad = new Swiper('.section-slider-proceso_calidad-contents', {
        navigation: {
            nextEl: '.section-slider-proceso_calidad-button-next',
            prevEl: '.section-slider-proceso_calidad-button-prev',
        },
        grabCursor: true,
        speed: 1500,
        slidesPerView: 1,
        preventClicks: false,
        spaceBetween: 0,
        autoHeight: true,
        preloadImages: false,
        breakpointsInverse: true,
        mousewheel: true,
        breakpoints: {
            320: {
                direction:'horizontal',
            },
            769: {
                direction:'vertical',
            },
        }
    });
    var timelineDesarrolloProcesoCalidad = new Swiper('.section-slider-proceso_calidad-desarrollo', {
        spaceBetween: 0,
        preventClicks: false,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
        breakpointsInverse: true,
        breakpoints: {
            320: {
                direction:'horizontal',
            },
            769: {
                direction:'vertical',
            },
        }
    });

     if (containerProcesoCalidad.length) {
        timelineContentsProcesoCalidad.controller.control = timelineDesarrolloProcesoCalidad;
        timelineDesarrolloProcesoCalidad.controller.control = timelineContentsProcesoCalidad;

        var width = $(window).width();

        var iconPuntosControl_1 = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-desarrollo .swiper-wrapper .swiper-slide:first-child .swipper-slide-puntos_control');
        var iconPuntosControl_2 = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-desarrollo .swiper-wrapper .swiper-slide.swiper-slide.swiper-slide-item-3 .swipper-slide-puntos_control');
        var iconPuntosControl_3 = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-desarrollo .swiper-wrapper .swiper-slide.swiper-slide.swiper-slide-item-8 .swipper-slide-puntos_control');
        var iconPuntosControlTodas = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-desarrollo .swiper-wrapper .swiper-slide .swipper-slide-puntos_control');


        containerProcesoCalidad.addClass('active-vertical');

        iconPuntosControl_1.addClass('active');

        timelineDesarrolloProcesoCalidad.on('slideChange', function () {

            iconPuntosControlTodas.removeClass('active')

            var slideActiveProcesoCalidad = timelineDesarrolloProcesoCalidad.activeIndex;

            if ( slideActiveProcesoCalidad <= 1 ) {
                iconPuntosControl_1.addClass('active');
            }
            else if ( slideActiveProcesoCalidad <= 6 ) {
                iconPuntosControl_1.addClass('active');
                iconPuntosControl_2.addClass('active');
            }
            else if ( slideActiveProcesoCalidad <= 7 ) {
                iconPuntosControl_1.addClass('active');
                iconPuntosControl_2.addClass('active');
                iconPuntosControl_3.addClass('active');
            }
            else if ( slideActiveProcesoCalidad == 8 ) {
                iconPuntosControlTodas.addClass('active');
            }

        }); 


        var width = $(window).width();
        var sliderItemTipoContentsProcesoCalidad = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-item');

        if (width > 480) {
            
            sliderItemTipoContentsProcesoCalidad.each(function (n) {
                var sliderItemTimelineContentsProcesoCalidad = $(this).attr('data-background');
                var containerBackgroundProcesoCalidadSrc = 'url(' + sliderItemTimelineContentsProcesoCalidad + ')';
                $(this).css({'background-image': containerBackgroundProcesoCalidadSrc});
            });

        } else {

            sliderItemTipoContentsProcesoCalidad.each(function (n) {
                var sliderItemTimelineContentsProcesoCalidad = $(this).attr('data-background-movil');
                var containerBackgroundProcesoCalidadSrc = 'url(' + sliderItemTimelineContentsProcesoCalidad + ')';
                $(this).css({'background-image': containerBackgroundProcesoCalidadSrc});
            });

        }


    } 

     $(window).on('resize', function () {

        var width = $(window).width();
        var sliderItemTipoContentsProcesoCalidad = $('.section-slider-proceso_calidad .section-slider-proceso_calidad-item');

        if (width > 480) {

            sliderItemTipoContentsProcesoCalidad.each(function (n) {
                var sliderItemTimelineContentsProcesoCalidad = $(this).attr('data-background');
                var containerBackgroundProcesoCalidadSrc = 'url(' + sliderItemTimelineContentsProcesoCalidad + ')';
                $(this).css({'background-image': containerBackgroundProcesoCalidadSrc});
            });

        } else {

            sliderItemTipoContentsProcesoCalidad.each(function (n) {
                var sliderItemTimelineContentsProcesoCalidad = $(this).attr('data-background-movil');
                var containerBackgroundProcesoCalidadSrc = 'url(' + sliderItemTimelineContentsProcesoCalidad + ')';
                $(this).css({'background-image': containerBackgroundProcesoCalidadSrc});
            });

        }


     });

    /***************** end SECTION PROCESO Y CALIDAD *****************/


    /***************** SECTION VIDEO 100% - HOME-ES *****************/

    var sectionPlayVideo  = $('.section-video-100');
    var playVideo  = $('.section-video-100 .section-video-100-video');
    var btnPlayVideo = $('.section-video-100 .section-video-100-play');
    
    btnPlayVideo.on(clickEventFilter, function (evt) {

        evt.preventDefault();
        playVideo.trigger('play');
        btnPlayVideo.fadeOut();

    });

    /***************** end SECTION VIDEO 100% - HOME-ES *****************/


    /***************** SECTION SCROLL VIDEOS  *****************/

        /*** SOSTENINBILIDAD ***/

        var swiperVideosSostenibilidad = new Swiper('.section-scroll_videos-content-sostenibilidad', {
            scrollbar: {
                el: '.section-scroll_videos-content-box-scrollbar_sostenibilidad',
                hide: false,
            },
            preloadImages: false,
            lazy: {
                loadPrevNext: true,
                loadOnTransitionStart: true,
            },
            breakpointsInverse: true,
            preventClicks: false,
            breakpoints: {
                320: {
                    allowSlideNext: true,
                    allowSlidePrev: true,
                    allowTouchMove: true,
                    hide: true,
                    preventClicks: true,
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerView: 1.4,
                    spaceBetween: 14,
                },
                481: {
                    allowSlideNext: true,
                    allowSlidePrev: true,
                    allowTouchMove: true,
                    hide: true,
                    preventClicks: true,
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerView: 2.5,
                    spaceBetween: 12,
                },
                769: {
                    allowSlideNext: true,
                    allowSlidePrev: true,
                    allowTouchMove: true,
                    hide: true,
                    preventClicks: true,
                    slidesOffsetAfter: 0,
                    slidesOffsetBefore: 0,
                    slidesPerView: 2.9,
                    spaceBetween: 18,
                },
                961: {
                    allowSlideNext: false,
                    allowSlidePrev: false,
                    allowTouchMove: false,
                    hide: true,
                    slidesPerView: 4,
                    spaceBetween: 12,
                },
                1025: {
                    allowSlideNext: false,
                    allowSlidePrev: false,
                    allowTouchMove: false,
                    hide: true,
                    slidesPerView: 4,
                    spaceBetween: 18,
                },
                1201: {
                    allowSlideNext: false,
                    allowSlidePrev: false,
                    allowTouchMove: false,
                    hide: true,
                    slidesPerView: 4,
                    spaceBetween: 24,
                },
            }
        });

        /*** end SOSTENINBILIDAD ***/

         /*** IFRAME POP UP VIDEOS ***/

        var slideLinkVideo = $('.section-scroll_videos .section-scroll_videos-content-box-items span');
        var boxIframeVideo =$('.section-scroll_videos .section-scroll_videos-content-lightbox');
        var boxIframeVideoInner =$('.section-scroll_videos .section-scroll_videos-content-lightbox .section-scroll_videos-content-iframe');
        var boxIframeVideoClose =$('.section-scroll_videos .section-scroll_videos-content-lightbox .section-scroll_videos-content-close');

        slideLinkVideo.on(clickEventFilter, function () {

            boxIframeVideoInner.empty();

            var slideLinkUrlVideo = $(this).attr('data-video-sostenibilidad');
            slideLinkUrlVideoFinal = '<iframe width="100%" src="https://www.youtube.com/embed/' + slideLinkUrlVideo + '?autoplay=1&amp;rel=0&amp;controls=1&amp;showinfo=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen frameborder="0" scrolling="no"></iframe>';
            
            var slideTitleVideo = $(this).children('.section-scroll_videos-content-box-items-title').text();
            var slideBodyVideo = $(this).children('.section-scroll_videos-content-box-items-content').text();
            slideTextVideoFinal = '<p><span>' + slideBodyVideo + '</span> <span> - '  + slideTitleVideo + ' </span></p> ';
        
            boxIframeVideoInner.html(slideLinkUrlVideoFinal + slideTextVideoFinal);

            boxIframeVideo.addClass('active');

        });

        boxIframeVideoClose.on(clickEventFilter, function () {

            boxIframeVideo.removeClass('active')
            boxIframeVideoInner.empty();

        });

        /*** end IFRAME POP UP  VIDEOS ***/

    /***************** end SECTION SCROLL VIDEOS  *****************/


    /***************** SECTION SOSTENIBILIDAD  *****************/

        /***************** SECTION LINKS CIRC - SOSTENIBILIDAD MENU SCROLL  *****************/

        var itemNavSustainability = $('.section-link_circ .section-link_circ-box-items');

        itemNavSustainability.on(clickEventFilter, function () {

            var itemNav = $(this).attr('data-icon');
            var itemNavActive =  $('#' + itemNav + '.active').parents('.section-sostenibilidad');

            var positionId = itemNavActive.offset().top;

            if('.section-subnav-slider'){
                var submenuHeight = $('.section-subnav-slider').height();
                positionId -= submenuHeight;
            }

            var speed;

            switch (itemNav) {
              case 'quality':
                speed = 500;
                break;
              case 'social':
                speed = 1000;
                break;
              case 'environmental':
                speed = 1500;
                break;
              case 'economy':
                speed = 2000;
                break;
            }

            $("html, body").animate({
                scrollTop: positionId
            }, speed);

        });

        /***************** end SECTION LINKS CIRC - SOSTENIBILIDAD MENU SCROLL *****************/

    var sectionSostenibilidad = $('.section-sostenibilidad'); 
    var sectionSostenibilidadBoxImg = $('.section-sostenibilidad .section-sostenibilidad-col_img'); 

    chooseBgImage(sectionSostenibilidadBoxImg, width);

    $(window).on('resize', function() {

        var sectionSostenibilidadBoxImg = $('.section-sostenibilidad .section-sostenibilidad-col_img'); 
        var width = $(window).width();
        chooseBgImage(sectionSostenibilidadBoxImg, width);

     });

    /***************** end SECTION SOSTENIBILIDAD  *****************/


    /***************** SECTION PRODUCT HEADER  *****************/

        var btnViewMore = $('.section-product_header .section-product_header-button a');

        btnViewMore.on(clickEventFilter, function () {

            var ProductLightbox = $(this).parents('.section-product_header').find('.section-product_header-lightbox');
            var titleProductLightbox = $(this).parents('.section-product_header').find('.section-product_header-box-title').html();
            var bodyProductLightbox = $(this).parents('.section-product_header').find('.section-product_header-box-content-second').html();
            var ProductLightboxTitle = $(ProductLightbox).find('.section-product_header-box-title');
            var ProductLightboxBody = $(ProductLightbox).find('.section-product_header-box-content-second');

            ProductLightboxTitle.empty();
            ProductLightboxBody.empty();
            ProductLightbox.addClass('active');

            ProductLightboxTitle.append(titleProductLightbox);
            ProductLightboxBody.append(bodyProductLightbox);


        });

        var btnClose = $('.section-product_header .section-product_header-lightbox-close');

         btnClose.on(clickEventFilter, function () {

            var ProductLightbox = $(this).parents('.section-product_header').find('.section-product_header-lightbox');
            ProductLightbox.removeClass('active');

        });

    /***************** end SECTION PRODUCT HEADER  *****************/

});