// ZURB
// -----------------------------------------------------------------------------
$(document).foundation();

// SCROLLER WIDGET
// -----------------------------------------------------------------------------
$(document).on('scroll', function() {
    if ($(window).scrollTop() > 100) {
        $('.scroll-top-wrapper').addClass('show');
    } else {
        $('.scroll-top-wrapper').removeClass('show');
    }
});

$('.scroll-top-wrapper').on('click', scrollToTop);

function scrollToTop() {
    var verticalOffset = 100;
    var element = $('body');
    var offset = element.offset();
    var offsetTop = offset.top;
    $('html, body').animate({
        scrollTop: offsetTop
    }, 500, 'linear');
}


// READY
// -----------------------------------------------------------------------------
$(document).ready(function() {

});

$(window).on('load', function() {

    function reflowTopBar() {
        $('.top-bar').foundation();
    };

    function reflowOffCanvas() {
        $('#main-menu').foundation();
    };

    function reflowSideBar() {
        $('#sidebar-menu').foundation();
    };

    $("#top-bar").loadTemplate("templates/topbar.html", {}, {
      isFile: true,
      afterInsert: reflowTopBar
    });

    $("#footer").loadTemplate("templates/footer.html");

    $("#off-canvas").loadTemplate("templates/offcanvas.html", {}, {
        isFile: true,
        afterInsert: reflowOffCanvas
    });
    $("#sidebar").loadTemplate("templates/sidebar.html", {}, {
        isFile: true,
        afterInsert: reflowSideBar
    });
});
