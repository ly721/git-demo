'use strict';
// 1.less编译 压缩 合并
// 2.js合并 压缩 混淆
// 3.img 复制
// 4.html压缩


var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');


// 1.less编译 压缩 合并
gulp.task('styles',function(){
	gulp.src('src/styles/*.less')
	.pipe(less())
	.pipe(cssnano())
	.pipe(concat('all.css'))
	.pipe(gulp.dest('dist/styles'))
	.pipe(browserSync.reload({server:true}));
});

// 2.js合并 压缩 混淆
gulp.task('js',function(){
	 gulp.src('src/js/*.js')
    .pipe(concat('all.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({stream:true}));
});

// 3.img 复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images'))
	.pipe(browserSync.reload({stream:true}));
});

var htmlmin= require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src('*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
		}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({stream:true}));
});

var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({server: true, function(err, bs) {
	    console.log(bs.options.getIn(["urls", "local"]));
	    });
	//访问的是网站根目录
   });
});

var watch = require('gulp-watch');
gulp.task('change',function(){
	watch('*.html',function(){
		gulp.src('*.html')
		.pipe(htmlmin({
			collapseWhitespace: true,
			removeComments: true
			}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream:true}));
	});
});

