'use strict';

var gulp        = require('gulp'),
	rigger      = require('gulp-include'),
	prefixer    = require('gulp-autoprefixer'),
	less        = require('gulp-less'),
	cssmin      = require('gulp-cssmin'),
	uglify      = require('gulp-uglify'),
	imagemin    = require('gulp-imagemin'),
	pngquant    = require('imagemin-pngquant'),
	spritesmith	= require('gulp.spritesmith'),
	connect     = require('gulp-connect'),
	opn         = require('opn'),
	rimraf      = require('rimraf'),
	bower       = require('gulp-bower'),
	filter      = require('gulp-filter');

var buildpath = 'build';

gulp.task('bower', function() {
    return bower();
});
	
var path = {
    build: {
        html:   buildpath + '/',
        js:     buildpath + '/js/',
        css:    buildpath + '/css/',
        img:    buildpath + '/img/',
        fonts:  buildpath + '/fonts/',
        bower:  buildpath + '/vendor/'
    },
    src: {
        html:               'src/pages/*.html',
        js:                 'src/js/script.js',
        style:              'src/less/style.*',
        img:                'src/img/work/**/*.*',
        imgicons:           'src/img/icons/*.png',
        fonts:              'src/fonts/**/*.*',
        bower:              'src/bower_components/**/*.*',
        path_lesspartials:  'src/less/partials/',
        path_img:           'src/img/work/'
    },
    watch: {
        html:   'src/pages/**/*.html',
        bower:  'src/bower_components/**/*.*',        
        js:     'src/js/**/*.js',
        style:  'src/less/**/*.*',
        img:    [
        	'src/img/**/*.*',
        	'!src/img/work/icons.png'
        ],
        fonts:  'src/fonts/**/*.*'
    },
    clean: './build'
};

var server = {
    host: 'localhost',
    port: '9000'
};

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('webserver', function() {
    connect.server({
        host: server.host,
        port: server.port,
        livereload: true
    });
});

gulp.task('openbrowser', function() {
    opn( 'http://' + server.host + ':' + server.port + '/' + buildpath );
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(connect.reload());
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        .pipe(uglify()) 
        .pipe(gulp.dest(path.build.js)) 
        .pipe(connect.reload()); 
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) 
        .pipe(less())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build.css)) 
        .pipe(connect.reload());
});

gulp.task('sprite', function () {
	var spriteData = gulp.src(path.src.imgicons)
		.pipe(spritesmith({
			imgName: 'icons.png',
			cssName: 'icons.less',
			algorithm: 'binary-tree',
			cssFormat: 'css',
			cssTemplate: 'css_template_icons.css.mustache',
		}));
		
	spriteData.img.pipe(gulp.dest(path.src.path_img));
	spriteData.css.pipe(gulp.dest(path.src.path_lesspartials));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(connect.reload());

	gulp.run('sprite');
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('bower:build', function() {
	var mfilter = filter([
            '**/*.*', 
            '!**/src/**/*.*', 
            '!**/*.json', 
            '!**/.gitignore', 
            '!**/*Gulpfile.js', 
            '!**/*.md', 
            '!**/*.json', 
            '!**/.jshintrc', 
            '!**/*.txt', 
            '!**/*.psd',
            '!**/*.scss',
            '!**/*.sass',
            '!**/*.less',
            '!**/*.map',
            '!**/*.md',
    ]);
    var cssfilter = filter(['**/*.css'], {restore: true});
    var jsfilter = filter(['**/*.js'], {restore: true});
	
	gulp.src(path.src.bower)
		.pipe(cssfilter)
		.pipe(cssmin())
		.pipe(cssfilter.restore)
		//.pipe(mfilter)
        .pipe(gulp.dest(path.build.bower))
});

gulp.task('watch', function() {
	gulp.watch(path.watch.html,  ['html:build']);
	gulp.watch(path.watch.js,    ['js:build']);
	gulp.watch(path.watch.style, ['style:build']);
	gulp.watch(path.watch.img,   ['image:build']);
	gulp.watch(path.watch.fonts, ['fonts:build']);
	gulp.watch(path.watch.bower, ['bower:build', 'style:build']);
});

gulp.task('watch:bitrix', function() {
	gulp.watch(path.watch.js,    ['js:build']);
	gulp.watch(path.watch.style, ['style:build']);
	gulp.watch(path.watch.img,   ['image:build']);
	gulp.watch(path.watch.fonts, ['fonts:build']);
	gulp.watch(path.watch.bower, ['bower:build', 'style:build']);
});

gulp.task('build', [
	'image:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
	'bower:build'
]);

gulp.task('build:watch', [
	'image:build',
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
	'bower:build',
	'watch'
]);

gulp.task('build:bitrix', [
	'image:build',
    'js:build',
    'style:build',
    'fonts:build',
	'bower:build'
]);

gulp.task('build:bitrix:watch', [
	'image:build',
    'js:build',
    'style:build',
    'fonts:build',
	'bower:build',
	'watch:bitrix'
]);

gulp.task('server', ['bower', 'build', 'watch', 'webserver', 'openbrowser']);
gulp.task('default', ['build']);