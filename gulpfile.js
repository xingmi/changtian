var gulp = require('gulp');
var cheerio  = require('gulp-cheerio');
var getTime = new Date().getTime();
var replace = require('gulp-replace');

gulp.task('default', function() {
    return gulp.src('./*.html')
        .pipe(replace(/.js/g, '.js?v='+getTime))
        .pipe(gulp.dest('./'));
});