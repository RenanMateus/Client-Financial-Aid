const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin')
const uglify = require('gulp-uglify');
const uglifycss = require('gulp-uglifycss');
const browserSync = require('browser-sync').create();
gulp.task('app', ['app.html', 'app.css', 'app.js', 'app.assets']);

gulp.task('app.html', () =>{
    gulp.src('./src/app/**/*.html') //Erro ao minificar alguns arquivos html
    .pipe(gulp.dest('public/'))
})
gulp.task('app.css', () =>{
    return gulp.src('src/app/**/*.css')
    .pipe(uglifycss({"uglyComments": true}))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest('public/assets/css'));
});
gulp.task('app.js', () =>{
    gulp.src('./src/app/**/*.js')
            .pipe(babel({presets:['env']}))
            .pipe(uglify())
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('public/assets/js'))

})
gulp.task('app.assets', () =>{
    gulp.src('./src/app/assets/**/*.*')
    .pipe(gulp.dest('public/assets/file'))
})