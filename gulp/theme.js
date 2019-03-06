// Load Plugins
var gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat')

// Styles
gulp.task('styles', function () {
return gulp.src('deps/scss/theme.scss')
.pipe(sourcemaps.init({loadMaps: true}))
.pipe(sass().on('error', sass.logError))
.pipe(rename({suffix: '.min'}))
.pipe(cleanCSS())
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest('public/dist'))
})

// Styles ecommerce
gulp.task('styles-ecommerce', function () {
return gulp.src('scss/custom/ecommerce/theme.scss')
.pipe(sourcemaps.init({loadMaps: true}))
.pipe(sass().on('error', sass.logError))
.pipe(rename({basename: 'ecommerce', suffix: '.min'}))
.pipe(cleanCSS())
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest('public/dist'))
})

// Scripts
gulp.task('scripts', function () {
return gulp.src([
  'deps/js/bootstrap/*.js',
  'deps/js/vendor/*.js',
  'deps/js/custom/*.js',
  'deps/js/theme.js'
])
.pipe(sourcemaps.init())
.pipe(concat('theme.js'))
.pipe(rename({suffix: '.min'}))
.pipe(uglify())
.pipe(sourcemaps.write('./'))
.pipe(gulp.dest('public/dist'))
})

// Images
gulp.task('images', function () {
gulp.src('deps/images/**/*.+(png|jpg|jpeg|gif|svg)')
.pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
.pipe(gulp.dest('../public/dist/images'))
})

// Fonts
gulp.task('fonts', function () {
return gulp.src('deps/fonts/**/*')
.pipe(gulp.dest('public/dist/fonts'))
})

// Default task
gulp.task('theme', function () {
    gulp.start('styles', 'styles-ecommerce', 'scripts', 'images', 'fonts')
})

// Watch
