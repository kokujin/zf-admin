// ZURB
// -----------------------------------------------------------------------------
$(document).foundation();

// TEMPLATING
// -----------------------------------------------------------------------------
$(window).on('load', function() {

    // Template callbacks
    // -------------------------------------------------------------------------
    function reflowTopBar() {
        $('.top-bar').foundation();
    };

    function reflowOffCanvas() {
        $('#main-menu').foundation();
        $('#content-container').foundation();
    };

    function reflowSideBar() {
        $('#sidebar-menu').foundation();
    };

    // Templating
    // -------------------------------------------------------------------------

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
