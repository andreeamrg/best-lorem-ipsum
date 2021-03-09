
// Release 1.0.0

// Global settings


var scss_src = './static/src/scss/**/',
    scss_dist = './static/dist/css/',
    scss_prefix = 'last 5 versions';

var js_src = './static/src/js/',
    js_dist = './static/dist/js/',
    js_file = 'main.js';

var img_src = './static/src/images/**/*',
    img_dist = './static/dist/images/';

var font_name = 'icon-font',
    font_class_name = 'icon',
    font_src = '/static/src/fonts/',
    font_dist = '/static/dist/fonts/',
    icon_src = './static/src/icons/';

// dependencies
var browserify = require('browserify'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefix = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    cache = require('gulp-cached'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    path = require('path'),
    source = require('vinyl-source-stream'),
    sourcemaps = require('gulp-sourcemaps'),
    errorHandler = require('./errorHandler'),
    postcss = require('gulp-postcss'),
    reporter = require('postcss-reporter'),
    stylelint = require('stylelint'),
    iconfont = require('gulp-iconfont'),
    consolidate = require('gulp-consolidate'),
    syntax_scss = require('postcss-scss'),
    rename = require("gulp-rename"),
    del = require("del"),
    scsslint = require('gulp-scss-lint'),
    gutil = require('gulp-util'),
    beepbeep = require('beepbeep');

// browserify config
// @requires browserify
var bundler = browserify({
    entries: [path.join(js_src, js_file)],
    cache: {},
    packageCache: {},
    fullPaths: false
});

// clean folders
// @requires del
gulp.task('delete', function (cb) {
    return del('./static/dist/', cb);
});

// output CSS files which are expanded
// @requires gulp-sass
// @requires gulp-autoprefixer
// @requires task: scss_lint
gulp.task('scss_development', function () {
    gulp.src(scss_src + '*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: [scss_prefix]
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(scss_dist));
});

// output CSS files which are expanded
// @requires gulp-sass
// @requires gulp-autoprefixer
// @requires task: scss_lint
gulp.task('scss_production', function () {
    gulp.src(scss_src + '*.scss')
        .pipe(sass.sync({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefix({
            browsers: [scss_prefix]
        }))
        .pipe(gulp.dest(scss_dist));
});

// SVG font creation
// @requires gulp-iconfont
// @requires gulp-consolidate
// @requires gulp-rename
gulp.task('icon_font', function () {
    gulp.src([icon_src + '*.svg'])
        .pipe(iconfont({
            fontName: font_name,
            prependUnicode: false,
            normalize: true,
            formats: ['ttf', 'eot', 'woff', 'woff2'],
            fontHeight: 1000
        }))
        .on('glyphs', function (glyphs) {
            gulp.src("." + font_src + '/font_template.css')
                .pipe(consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: font_name,
                    fontPath: "/dist/fonts/",
                    className: font_class_name
                }))
                .pipe(rename('_icons.scss'))
                .pipe(gulp.dest('./static/src/scss/base/'));
        })
        .pipe(gulp.dest("." + font_dist));
});

// custom scss lint reporter
// @requires beepbeep
// @requires gulp-util
// @requires task: scss_lint
var customReporter = function (file) {
    'use strict';

    if (!file.scsslint.success) {
        if (file.scsslint.errors > 0) {
            gutil.log(gutil.colors.red(file.scsslint.errors + ' errors in ' + ' ' + file.path));
            file.scsslint.issues.forEach(function (val) {
                gutil.log(gutil.colors.blue(val.line + ':' + val.column) + ' - ' + val.reason);
            });
            beepbeep(2);
        }
        if (file.scsslint.warnings > 0) {
            gutil.log(gutil.colors.yellow(file.scsslint.warnings + ' warnings in ' + file.path));
            file.scsslint.issues.forEach(function (val) {
                gutil.log(gutil.colors.blue(val.line + ':' + val.column) + ' - ' + val.reason);
            });
        }
    }
};

// scss linter task
// @requires gulp-cached
// @requires gulp-scss-lint
// @requires function: customReporter()
// @requires .scss-lint.yml config file (See https://github.com/brigade/scss-lint/ for config)
gulp.task('scss_lint', function () {
    'use strict';

    gulp.src(scss_src + '*.scss')
        .pipe(cache('scsslint'))
        .pipe(scsslint({
            'config': 'scss-lint.yml',
            'maxBuffer': 100000,
            customReport: customReporter
            
        }));
});


// lint js files for errors
// @requires gulp-cached
// @requires gulp-jshint
// @requires jshint-stylish
// @requires .jshintrc config file (See http://jshint.com/docs/ for config)
gulp.task('js_lint', function () {

    return gulp.src([
            path.join('gulpfile.js', '**', '*.js'),
            path.join(js_src, '**', '*.js'),
        ])
        .pipe(cache('jslint'))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

// minify images
// @requires gulp-imagemin
// @requires imagemin-pngquant
gulp.task('imagemin', function () {

    return gulp.src(img_src + '*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }]
        }))
        .pipe(gulp.dest(img_dist));
});

// what Browserify should do when building the bundle
// @requires .errorHandler.js file
function bundle() {

    return bundler.bundle()
        // log errors if they happen
        .on('error', errorHandler)
        .pipe(source(js_file))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest(js_dist))
}

// what Browserify should do when building the bundle
// @requires .errorHandler.js file
function bundle_production() {

    return bundler.bundle()
        // log errors if they happen
        .on('error', errorHandler)
        .pipe(source(js_file))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(js_dist))
}

// bundle js modules into one file
// @requires browserify
// @requires vinyl-buffer
// @requires vinyl-source-stream
gulp.task('js', bundle);

// bundle js modules into one file
// @requires browserify
// @requires vinyl-buffer
// @requires vinyl-source-stream
gulp.task('js_production', bundle_production);

// gulp tasks
gulp.task('watch', function () {
    gulp.watch(scss_src + '*.scss', ['scss_development']);
    gulp.watch(js_src + '**/*.js', ['js', 'js_lint']);
});

// gulp default task
gulp.task('default', ['scss_development', 'js', 'js_lint', 'icon_font', 'imagemin', 'watch']);

// gulp production task
gulp.task('production', ['scss_production', 'js_production', 'icon_font', 'imagemin']);

// gulp clean task
gulp.task('clean', ['delete']);