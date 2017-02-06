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

    $("#off-canvas").loadTemplate("templates/offcanvas.html", {}, {
        isFile: true,
        afterInsert: reflowOffCanvas
    });
    $("#sidebar").loadTemplate("templates/sidebar.html", {}, {
        isFile: true,
        afterInsert: reflowSideBar
    });
});

// READY
// -----------------------------------------------------------------------------
$(document).ready(function() {

    // Checkboxes
    $('.custom-no-label[type=checkbox]').labelauty({
        label: false
    });
    $('.custom[type=checkbox]').labelauty();

    // Radio buttons
    $('.custom-no-label[type=radio]').labelauty({
        label: false
    });
    $('.custom[type=radio]').labelauty();
}); // End doc ready
