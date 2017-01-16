var gulp = require('gulp');
var cheerio  = require('gulp-cheerio');
var getTime = new Date().getTime();
var replace = require('gulp-replace');

gulp.task('default', function() {
    return gulp.src('./*.html')
        .pipe(replace(/.js/g, '.js?v='+getTime))
        // .pipe(cheerio(function ($, file) {
        //     var src = $("script[type='text/javascript']").attr('src');
        //     $("script[type='text/javascript']").attr('src', src + "?v=" + getTime)
        // }))
        // .pipe(minifyHTML({
        //     quotes : true
        // }))
        // .pipe( gulpif( W == 'h5',replace("../..",cdn_url) ) )
        // .pipe(replace('ulife-min.js','ulife-min.js?v='+ V))
        .pipe(gulp.dest('./'));
});