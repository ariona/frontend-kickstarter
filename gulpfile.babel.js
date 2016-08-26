'use strict';

import gulp          from 'gulp';
import sass          from 'gulp-sass';
import autoprefixer  from 'gulp-autoprefixer';
import browserSync   from 'browser-sync';
import babel         from 'gulp-babel';
import concat        from 'gulp-concat';
import jade          from 'gulp-jade';
import rename        from 'gulp-rename';
import uglifyCSS     from 'gulp-uglifycss';
import uglifyJs      from 'gulp-uglify';
import plumber       from 'gulp-plumber';
import notify        from 'gulp-notify';
import sourcemap     from 'gulp-sourcemaps';
import jshint        from 'gulp-jshint';
import stylish       from 'jshint-stylish';
import watch         from 'gulp-watch';
import optimizeImage from 'gulp-imagemin';
import ignore        from 'gulp-ignore';
import rimraf        from 'gulp-rimraf';
import zip           from 'gulp-zip';
import runSequence   from 'run-sequence';

const settings = {
	projectName : 'frontend-kickstarter',
	version     : '1.0.0',
	srcDir      : 'source',
	destDir     : 'dist'
};

gulp.task( 'jade', () =>  {

	return gulp.src( `./${settings.srcDir}/jade/*.jade` )
				.pipe( plumber() )
				.pipe( jade({ pretty: '\t' }) )
				.on('error', notify.onError({
					title   : 'Sob sob!!',
					message : 'Jade error bro',
					icon    : '',
					sound   : 'Basso'
			   	}))
				.on( 'error', function( err ){
			   		console.log( err );
			   		this.emit( 'end' );
			   	} )
				.pipe( gulp.dest( `./${settings.destDir}` ) );

} );

gulp.task( 'style', () =>  {

	return gulp.src( `./${settings.srcDir}/sass/*.scss` )
				.pipe( plumber() )
				.pipe( sourcemap.init() )
				.pipe( sass().on('error',sass.logError) )
				.on('error', notify.onError({
					title   : 'Eh Bro!!',
					message : 'SASS nya ada yang error tuh',
					icon    : '',
					sound   : 'Basso'
			   	}))
				.on('error', () => { this.emit( 'end' ) })
				.pipe( autoprefixer({browsers: "last 3 version"}) )
				.pipe( sourcemap.write( '.' ) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/css/` ) )
				.pipe( browserSync.stream({match: '**/*.css'}) )
				.pipe( uglifyCSS() )
				.pipe( rename({suffix: '.min'}) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/css/` ) );

} );


gulp.task( 'script', () =>  {

	return gulp.src( `./${settings.srcDir}/js/*.js` )
				.pipe( plumber() )
				.pipe( jshint()  )
				.pipe( jshint.reporter( stylish ) )
				.pipe( babel({ "presets": ["es2015"] }) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/js/` ) )
				.pipe( sourcemap.init() )
				.pipe( uglifyJs() )
				.pipe( rename({ suffix: '.min' }) )
				.pipe( sourcemap.write( '.' ) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/js` ) );

});

gulp.task( 'script-plugins', () =>  {

	return gulp.src( `./${settings.srcDir}/js/plugins/**/*.js` )
				.pipe( concat( 'plugins.js' ) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/js` ) )
				.pipe( sourcemap.init() )
				.pipe( uglifyJs() )
				.pipe( rename({ suffix: '.min' }) )
				.pipe( sourcemap.write( '.' ) )
				.pipe( gulp.dest( `./${settings.destDir}/assets/js` ) );

} );

gulp.task( 'image', () => {

	return gulp.src( `./${settings.destDir}/assets/images/*` )
				.pipe( optimizeImage() )
				.pipe( gulp.dest( `./${settings.destDir}/assets/images` ) );

} );

gulp.task( 'cleanup', () => {
	return gulp.src( ['**/.sass-cache','**./DS_Store'], {read:false} )
				.pipe( ignore('node_modules/**') )
				.pipe( rimraf({ force: true }) );
} );

gulp.task( 'build-zip', () => {

	return gulp.src( `./${settings.destDir}/**/` )
				.pipe( zip( settings.projectName+`-${settings.version}`+'.zip' ) )
				.pipe( gulp.dest('./') )
				.pipe( notify({
					title   : settings.projectName,
					message : "Bundling Project Completed. Output file: "+settings.projectName+`-${settings.version}`+".zip",
					sound   : false,
					icon    : false,
					onLast  : true
			   	}) );

});

gulp.task( 'bundle', cb => {

	runSequence( 'style', 'script', 'script-plugins', 'image', 'cleanup' , 'build-zip', cb  );

} );

gulp.task( 'watch', () =>  {
	
	console.log( "\x1b[31m%s","╔════════════════════════════════════════════════════════════╗" );
	console.log( "\x1b[31m%s\x1b[34m%s\x1b[0m\x1b[31m%s","║","   ╔═╗╦═╗╔═╗╔╗╔╔╦╗╔═╗╔╗╔╔╦╗                                 ","║");
	console.log( "\x1b[31m%s\x1b[34m%s\x1b[0m\x1b[31m%s","║","   ╠╣ ╠╦╝║ ║║║║ ║ ║╣ ║║║ ║║                                 ","║");
	console.log( "\x1b[31m%s\x1b[34m%s\x1b[0m\x1b[31m%s","║","   ╚  ╩╚═╚═╝╝╚╝ ╩ ╚═╝╝╚╝═╩╝                                 ","║");
	console.log( "\x1b[31m%s\x1b[36m%s\x1b[0m\x1b[31m%s","║","   ╦╔═╦╔═╗╦╔═╔═╗╔╦╗╔═╗╦═╗╔╦╗╔═╗╦═╗                          ","║");
	console.log( "\x1b[31m%s\x1b[36m%s\x1b[0m\x1b[31m%s","║","   ╠╩╗║║  ╠╩╗╚═╗ ║ ╠═╣╠╦╝ ║ ║╣ ╠╦╝                          ","║");
	console.log( "\x1b[31m%s\x1b[36m%s\x1b[0m\x1b[31m%s","║","   ╩ ╩╩╚═╝╩ ╩╚═╝ ╩ ╩ ╩╩╚═ ╩ ╚═╝╩╚═ v.1.0.0                  ","║");
	console.log( "\x1b[31m%s","╠════════════════════════════════════════════════════════════╣" );
	console.log( "\x1b[31m%s\x1b[32m%s\x1b[35m%s\x1b[0m\x1b[31m%s","║","   Author :"," Ariona, Rian                                    ","║" );
	console.log( "\x1b[31m%s\x1b[32m%s\x1b[35m%s\x1b[0m\x1b[31m%s","║","   URL    :"," studio.ariona.net                               ","║" );
	console.log( "\x1b[31m%s\x1b[32m%s\x1b[35m%s\x1b[0m\x1b[31m%s","║","   Mail   :"," studio@ariona.net                               ","║" );
	console.log( "\x1b[31m%s\x1b[32m%s\x1b[35m%s\x1b[0m\x1b[31m%s","║","   Source :"," http://ariona.github.com/frontend-kickstarter   ","║" );
	console.log( "\x1b[31m%s","╚════════════════════════════════════════════════════════════╝" );	

	browserSync.init({
		server: {
			baseDir:`./${settings.destDir}/`
		}
	});

	watch( `./${settings.srcDir}/jade/**/*.jade`, () => {
		gulp.start( 'jade', () => {			
			browserSync.reload();
		} );
	} );

	watch( `./${settings.srcDir}/sass/**/*.scss`, () => {
		gulp.start( 'style' )	;
	} );

	watch( `./${settings.srcDir}/js/*.js`, () =>  {
		gulp.start( 'script', () =>  {
			browserSync.reload();
		} );
	} );

	watch( `./${settings.srcDir}/js/plugins/*.js`, () =>  {
		gulp.start( 'script-plugins', () =>  {
			browserSync.reload();
		} );
	} );

});

gulp.task( 'default', ['watch'] );