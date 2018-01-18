var gulp        = require('gulp');
var webpack     = require('webpack-stream');
var postcss     = require('gulp-postcss');
var sourcemaps  = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
	var postcssPlugins = [
		require('postcss-partial-import'),
		require('postcss-utilities'),
		require('postcss-cssnext')({warnForDuplicates: false}),
		require('lost'),
		require('postcss-nested-ancestors'),
		require('postcss-nested'),
		require('stylelint'),
		require('cssnano')({preset: 'default'}),
		require('postcss-reporter')({ clearReportedMessages: true })
	];
	return gulp.src('sources/css/main.css')
		.pipe( sourcemaps.init() )
		.pipe( postcss(postcssPlugins) )
		.on('error', function handleError() {
			this.emit('end'); // Recover from errors
		})
		.pipe( sourcemaps.write('.') )
		.pipe( gulp.dest('assets/css') )
		.pipe( browserSync.stream() );
})

gulp.task('script', function() {
	return gulp.src('sources/js/main.js')
		.pipe(webpack({
			output: {
				filename: '[name].js',
			},
			module: {
				rules: [
					{
						test : /\.js$/,
						enforce : "pre",
						exclude : /(node_modules|bower_components)/,
						use: [{
								loader  : 'babel-loader',
							},
							{
								loader: "jshint-loader",
								options: { reporter: require('jshint-loader-reporter')("stylish") }
							}
						]
					}
				]
			},
		}))
		.on('error', function handleError() {
			this.emit('end'); // Recover from errors
		})
		.pipe(gulp.dest('assets/js'));
});

gulp.task("default", function(){
	browserSync.init({
		server: {baseDir: "./"}
	});
	gulp.watch('*.html').on("change",browserSync.reload);
	gulp.watch('sources/js/**/*.js', gulp.series('script', function (done) {
		browserSync.reload();
		done();
	}));
	gulp.watch('sources/css/**/*.css', gulp.parallel('css'));
});