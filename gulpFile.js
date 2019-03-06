const gulp = require('gulp');
const util = require('gulp-util');
const sequence = require('run-sequence');

require('./gulp/app');
require('./gulp/deps');
require('./gulp/server');


gulp.task('default', () =>{
    if(util.env.production)
        sequence('deps', 'app');
    else
        sequence('deps', 'app', 'server');
});  
gulp.task('build', () =>{
        sequence('deps', 'app');
});  
gulp.task('start', () =>{
        sequence('deps', 'app', 'server');
});  