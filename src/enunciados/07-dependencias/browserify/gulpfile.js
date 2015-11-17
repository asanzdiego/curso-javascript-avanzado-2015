var gulp = require('gulp');
var uglify = require('gulp-uglify');
var nodemon =require('gulp-nodemon');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var browserify = require('browserify');

gulp.task('browserify', function() {
  return browserify('./source/scripts/app.main.js')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// -- Tasks --------------------------------------------------------------------

gulp.task('watch', function() {
  gulp.watch('./source/scripts/*.js', ['browserify'])
  return;
});

gulp.task('build', function() {
  gulp.start(['browserify']);
  return;
});

gulp.task('server', function() {
  nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: '.git'
  });
});

// -- Run ----------------------------------------------------------------------

gulp.task('default', function() {
  gulp.start(['build', 'watch', 'server']);
  return;
});
