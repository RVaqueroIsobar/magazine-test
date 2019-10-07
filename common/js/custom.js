$(document).ready(function () {

    detectIE();

    if (navigator.userAgent.indexOf('Mac') > 0) {
        $('body').addClass('only-mac');
    }

    var clickEventFilter = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

    //langSelectionBox.on(clickEventFilter, function () {
     //   langSelector.toggleClass('active');
    //});

});


//Detectar IE e incluir clase

function detectIE() {

    console.log('hola');
    
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