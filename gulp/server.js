const gulp = require('gulp');
const watch = require('gulp-watch');
const webserver = require('gulp-webserver');
const browserSync = require('browser-sync').create();

gulp.task('watch', ()=>{
    watch('src/app/**/*.html').on('change', () =>{
        gulp.start('app.html');
        browserSync.reload();
    });
    watch('src/app/**/*.css').on('change', () =>{
        gulp.start('app.css');
        browserSync.reload();
    });
    watch('src/app/**/*.js').on('change', () =>{
        gulp.start('app.js');
        browserSync.reload();
    });
    watch('src/app/assets/**/*.*').on('change', () =>{
        gulp.start('app.assets');
        browserSync.reload();
    });
})
gulp.task('server', ['watch'],  ()=>{
    return browserSync.init(null, {
        open: true, 
        server: {
            baseDir: 'public'
        },
        port: '8080'
    });
})
