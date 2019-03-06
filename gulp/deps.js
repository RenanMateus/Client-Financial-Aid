const gulp = require('gulp'),
sass = require('gulp-sass'),
rename = require('gulp-rename'),
uglify = require('gulp-uglify'),
cleanCSS = require('gulp-clean-css'),
imagemin = require('gulp-imagemin'),
cache = require('gulp-cache'),
sourcemaps = require('gulp-sourcemaps'),
concat = require('gulp-concat')

const uglifycss = require('gulp-uglifycss');


gulp.task('deps', ['deps.assets', 'deps.js', 'deps.css']);

gulp.task('deps.js', () =>{
    return gulp.src([
            'node_modules/angular/angular.min.js',
            'node_modules/angular/angular.min.js',
            'node_modules/angular-toastr/dist/angular-toastr.tpls.js',
            'node_modules/angular-animate/angular-animate.min.js',
            'node_modules/angular-ui-router/release/angular-ui-router.min.js',
            'node_modules/angular-touch/angular-touch.min.js',
            'node_modules/angular-resource/angular-resource.min.js',
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
            'node_modules/sweetalert/dist/sweetalert.min.js',
            'node_modules/angular-file-upload/dist/angular-file-upload.min.js',
            'node_modules/angular-masks/releases/angular-input-masks.min.js',
            'node_modules/angular-cuppa-datepicker/js/datepicker-directive.js', //
            'bower_components/chart.js/dist/Chart.min.js',
            'bower_components/angular-chart.js/angular-chart.js',
            'bower_components/ngMask/dist/ngMask.min.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-ui-calendar/src/calendar.js',
            'bower_components/fullcalendar/dist/fullcalendar.min.js',
            'bower_components/fullcalendar/dist/gcal.js',
            'bower_components/fullcalendar/dist/lang/pt-br.js',
            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/angular-ui-select/dist/select.min.js',
            'bower_components/webcam/dist/webcam.min.js'
        ])
        .pipe(concat('deps.min.js'))
        .pipe(gulp.dest('public/assets/js'));
});
gulp.task('deps.css', () =>{
    return gulp.src([
            'node_modules/angular-ui-bootstrap/dist/ui-bootstrap-csp.css',
            'node_modules/angular-cuppa-datepicker/css/cuppa-datepicker-styles.css',
            'vendor/css/**/*.css',
            'bower_components/fullcalendar/dist/fullcalendar.css',
        ])
        .pipe(uglifycss({"uglyComments": true}))
        .pipe(concat('deps.min.css'))
        .pipe(gulp.dest('public/assets/css'));
});
gulp.task('deps.assets', () =>{
    return gulp.src([
            'vendor/**/*.*'
        ])
        .pipe(gulp.dest('public'));
});