var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

gulp.task('styles', function() {
  gulp.src("app/scripts/css/**/*.css")
  .pipe(concat("main.min.css"))
  .pipe(gulp.dest("dist/scripts/css"));
});

gulp.task('default', function() {
  // place code for your default task here
});