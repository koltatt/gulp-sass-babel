var gulp         = require('gulp');
var sass         = require('gulp-sass');
var babel        = require('gulp-babel');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var minifyCss    = require('gulp-minify-css');
var uglify       = require('gulp-uglify');
var runSequence  = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

var basePaths = {
  src: 'app/assets/',
  dest: 'public/assets/'
}

var paths = {
  scripts: {
    src: basePaths.src + 'js/',
    dest: basePaths.dest + 'js/'
  },
  style: {
    src: basePaths.src + 'sass/',
    dest: basePaths.dest + 'css/'
  }
}

gulp.task('style', function(){
  return gulp.src(paths.style.src + '*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(minifyCss())
  .pipe(rename({
    extname: '.min.css'
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.style.dest))
});

gulp.task('js', function(){
  return gulp.src((paths.scripts.src + '*.js'))
  .pipe(sourcemaps.init())
  .pipe(babel({
      presets: ['es2015']
  }))
  .pipe(uglify())
  .pipe(rename({
    extname: '.min.js'
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.scripts.dest))
});

gulp.task('build', function(done) {
  runSequence(['style', 'js'], done);
});

gulp.task('watch', function() {
  gulp.watch([paths.style.src + '*.scss'], ['style']);
  gulp.watch([paths.scripts.src + '*.js'], ['js']);
});

gulp.task('default', function() {
  gulp.start('build');
})