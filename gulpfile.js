"use strict";

var gulp = require('gulp-help')(require('gulp'));
var pump = require('pump');
var plugins = require('gulp-load-plugins')();
var taskListing = require('gulp-task-listing');
var run = require('run-sequence');
var merge = require('merge-stream');
var realFavicon = require('gulp-real-favicon');
var fs = require('fs');
var path = require('path');

var cssFiles = [];

var jsFiles = [
    'bower_components/jquery/dist/jquery.js',

    // Furb foundation files
    'bower_components/foundation-sites/js/foundation.core.js',
    'bower_components/foundation-sites/js/foundation.util.*.js',

    // To reduce generated code, comment out the plugins you do not need
    'bower_components/foundation-sites/js/foundation.abide.js',
    'bower_components/foundation-sites/js/foundation.accordion.js',
    'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    'bower_components/foundation-sites/js/foundation.drilldown.js',
    'bower_components/foundation-sites/js/foundation.dropdown.js',
    'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    'bower_components/foundation-sites/js/foundation.equalizer.js',
    'bower_components/foundation-sites/js/foundation.interchange.js',
    'bower_components/foundation-sites/js/foundation.magellan.js',
    'bower_components/foundation-sites/js/foundation.offcanvas.js',
    'bower_components/foundation-sites/js/foundation.orbit.js',
    'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    'bower_components/foundation-sites/js/foundation.reveal.js',
    'bower_components/foundation-sites/js/foundation.slider.js',
    'bower_components/foundation-sites/js/foundation.sticky.js',
    'bower_components/foundation-sites/js/foundation.tabs.js',
    'bower_components/foundation-sites/js/foundation.toggler.js',
    'bower_components/foundation-sites/js/foundation.tooltip.js',
    'bower_components/foundation-sites/js/foundation.zf.responsiveAccordionTabs.js',

    // VENDORS
    'bower_components/mods/mods.js',
    'bower_components/jquery-load-template/dist/jquery.loadTemplate.js',
    'bower_components/responsive-lightbox/jquery.lightbox.js',
    'bower_components/chart.js/dist/Chart.bundle.js',
    'bower_components/countUp.js/dist/countUp.js',
    'bower_components/flatpickr/dist/flatpickr.js',
    'bower_components/noty/js/noty/packaged/jquery.noty.packaged.js',
    'bower_components/jquery-labelauty/source/jquery-labelauty.js',
    'bower_components/fakerator/dist/fakerator.js',
    'bower_components/fakerator/dist/locales/de-DE.js',
    'bower_components/datatables.net/js/jquery.dataTables.js',
    'bower_components/datatables-responsive/js/dataTables.responsive.js',
    'bower_components/datatables-responsive/js/responsive.foundation.js',
    'assets/js/stickyFooter.js'
];

// Tasks
// -----------------------------------------------------------------------------
gulp.task('help', taskListing);

// Default
// -----------------------------------------------------------------------------
gulp.task('default', ['build-all']);

// Build all
// -----------------------------------------------------------------------------

gulp.task('build-all', function(callback) {
    run('build-js',
        'build-sass',
        'copy-fonts',
        'prepare-default-images',
        'prepare-example-assets',
        callback);
});

// LINT JS
// -----------------------------------------------------------------------------
gulp.task('lint-js', function() {
    return gulp.src('assets/scripts/**/*.js')
        .pipe(plugins.debug())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('jshint-stylish'))
        .pipe(plugins.jshint.reporter('fail'));

});

// BUILD JS ASSETS
// -----------------------------------------------------------------------------
gulp.task('build-js', 'Build JS assets', function(cb) {
    pump([
            gulp.src(jsFiles),
            plugins.debug(),
            plugins.concat('zf.admin.js'),
            gulp.dest('dist/js'),
            gulp.dest('example/js'),
            plugins.babel({
                presets: ['es2015']
            }),
            plugins.uglify({
                compress: false,
                mangle: false
            }),
            plugins.rename({
                suffix: '.min'
            }),
            plugins.size(),
            gulp.dest('dist/js'),
            gulp.dest('example/js')
        ],
        cb
    );
});

// Compile SASS, compress
// -----------------------------------------------------------------------------
gulp.task('build-sass', 'Build all SASS files', function() {

    var scssStream = gulp.src([
            './assets/styles/app.scss'
        ])
        .pipe(plugins.debug())
        .pipe(plugins.size({
            title: 'SASS before: ',
            pretty: false
        }))
        .pipe(plugins.sass({
                includePaths: [
                    'bower_components/foundation-sites/scss',
                    'bower_components/motion-ui/src'
                ]
            })
            .on('error', plugins.sass.logError))
        .pipe(plugins.autoprefixer())

        .pipe(plugins.rename('zf.admin.css'))
        .pipe(plugins.size({
            title: 'SASS after: ',
            pretty: true
        }));

    var cssStream = gulp.src(cssFiles)
        .pipe(plugins.debug())
        .pipe(plugins.concat('non-sass.css'));


    var mergedStream = merge(scssStream);

    mergedStream.add(cssStream)
        .pipe(plugins.cleanCss({
            debug: true
        }, function(details) {
            console.log(details.name + ': ' + details.stats.originalSize);
            console.log(details.name + ': ' + details.stats.minifiedSize);
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('example/css'))
        .pipe(plugins.rename('zf.admin.min.css'))
        .pipe(plugins.size({
            title: 'Combined SASS, CSS: ',
            pretty: true
        }))
        .pipe(gulp.dest('dist/css'))

    return mergedStream;
});

// FONTS
// -----------------------------------------------------------------------------
gulp.task('copy-fonts', 'Copy web fonts to corresponding folder', function(cb) {
    var fontfiles = [
        'bower_components/mfglabs-iconset/css/font/mfglabsiconset-webfont.eot',
        'bower_components/mfglabs-iconset/css/font/mfglabsiconset-webfont.svg',
        'bower_components/mfglabs-iconset/css/font/mfglabsiconset-webfont.ttf',
        'bower_components/mfglabs-iconset/css/font/mfglabsiconset-webfont.woff'
    ];

    pump([
            gulp.src(fontfiles),
            plugins.debug(),
            gulp.dest('dist/css/font')
        ],
        cb
    );
});

// Default images
// -----------------------------------------------------------------------------
gulp.task('prepare-default-images', 'Prepare default images', function(cb) {
    var paths = [{
            'filePath': 'bower_components/responsive-lightbox/close.png',
            'destPath': 'css'
        },
        {
            'filePath': 'bower_components/responsive-lightbox/loading.gif',
            'destPath': 'css'
        },
        {
            'filePath': 'bower_components/responsive-lightbox/next.png',
            'destPath': 'css'
        },
        {
            'filePath': 'bower_components/responsive-lightbox/previous.png',
            'destPath': 'css'
        },
        {
            'filePath': 'bower_components/jquery-labelauty/source/images/input-checked.png',
            'destPath': 'css/images'
        },
        {
            'filePath': 'bower_components/jquery-labelauty/source/images/input-unchecked.png',
            'destPath': 'css/images'
        },
        {
            'filePath': 'assets/images/avatar.jpg',
            'destPath': 'images'
        },
        {
            'filePath': 'bower_components/datatables.net-dt/images/sort_asc_disabled.png',
            'destPath': 'images'
        },
        {
            'filePath': 'bower_components/datatables.net-dt/images/sort_asc.png',
            'destPath': 'images'
        },
        {
            'filePath': 'bower_components/datatables.net-dt/images/sort_both.png',
            'destPath': 'images'
        },
        {
            'filePath': 'bower_components/datatables.net-dt/images/sort_desc_disabled.png',
            'destPath': 'images'
        },
        {
            'filePath': 'bower_components/datatables.net-dt/images/sort_desc.png',
            'destPath': 'images'
        }
    ];

    for (var i = 0; i < paths.length; i++) {
        var destPathPrefix = 'dist';
        var destPath = path.join(destPathPrefix, paths[i].destPath);

        gulp.src(paths[i].filePath)
            .pipe(plugins.debug())
            .pipe(gulp.dest(destPath));
    }

});

// Example assets
// -----------------------------------------------------------------------------
gulp.task('prepare-example-assets', 'Prepares assets for the example template',
    function(cb) {
        gulp.src('dist/**/*')
            .pipe(plugins.debug())
            .pipe(gulp.dest('example'));
    });
