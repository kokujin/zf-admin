// ZURB
// -----------------------------------------------------------------------------
$(document).foundation();

// TEMPLATING
// -----------------------------------------------------------------------------
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


// READY
// -----------------------------------------------------------------------------
$(document).ready(function() {

    // Countup
    // -------------------------------------------------------------------------
    var easingFn = function(t, b, c, d) {
        var ts = (t /= d) * t;
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    }
    var options = {  
        useEasing: true,
          easingFn: easingFn,
          useGrouping: true,
          separator: ',',
          decimal: '.',
          prefix: '',
          suffix: ''
    };

    // Dash counters
    var counter1 = new CountUp("counter-1", 0, 918, 0, 2.5, options);
    counter1.start();

    var counter2 = new CountUp("counter-2", 0, 458, 0, 2.5, options);
    counter2.start();

    var counter3 = new CountUp("counter-3", 0, 570, 0, 2.5, options);
    counter3.start();

    var counter4 = new CountUp("counter-4", 0, 911, 0, 2.5, options);
    counter4.start();

    // CHarts
    // For a pie chart
    var data = {
        labels: [
            "Red",
            "Blue",
            "Yellow"
        ],
        datasets: [{
            data: [300, 50, 100],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56"
            ]
        }]
    };

    var ctxChart1 = $("#chart1");
    var pieChart = new Chart(ctxChart1, {
        type: 'pie',
        data: data,
        options: options
    });

    var lineData = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "My First dataset",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40],
            spanGaps: false,
        }]
    };
    var ctxChart2 = $("#chart2");
    var lineChart = new Chart(ctxChart2, {
        type: 'line',
        data: lineData,
        options: options
    });

    var n1 = noty({
        theme: 'relax',
        text: 'Informational notice',
        type: 'information', // success, error, warning, information, notification
        timeout: 3000
    });

    var n2 = noty({
        theme: 'relax',
        text: 'An error notice',
        type: 'error',
        timeout: 2000
    });

    var n3 = noty({
        theme: 'relax',
        text: 'A success notice',
        type: 'success',
        timeout: 1000
    });


}); // End doc ready
