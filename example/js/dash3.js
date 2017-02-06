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
  // Variables, depemdencies
    var numUsers = 10;
    var users = [];
    var fakerator = Fakerator();

    for (var x = 0; x < numUsers; x++) {
        var user = fakerator.entity.user();
        users.push(user);
    }

    $('#data-table').dataTable({ responsive: true});

}); // End doc ready
