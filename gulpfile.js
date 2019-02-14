var gulp = require('gulp');
var browserSync = require('browser-sync').create();// 静态服务器
var less = require('gulp-less');
var nodemon = require('gulp-nodemon');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var rev = require('gulp-revm');
var revCollector = require('gulp-revm-collector');
// 自动刷新
gulp.task('browser-sync',['nodemon'], function() {
   const files = [
      './src/views/template/*.8',
      './src/static/less/*.less',
      './src/static/js/**/*.js',
      './src/router/**/*.js',
   ]
   browserSync.init({
    proxy: 'http://localhost:8888',
    files: files,
    // browser: 'google chrome',
    notify: false,
    port: 5000
   });
});
// 编译 less
gulp.task('lessPC', function() {
  gulp.src('./src/static/pc/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./src/static/pc/css'))
})
gulp.task('lessMobile', function() {
  gulp.src('./src/static/mobile/less/*.less')
    .pipe(less())
    .pipe(minifyCss())
    .pipe(gulp.dest('./src/static/mobile/css'))
})

// 启动服务
gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon({
    exec: 'node index.js',
    env: { 'NODE_ENV':'development'}
  })
  .on('start', function () {
    if (!called) {
      cb();
      called = true;
    }
  });
});

// 监听变化
gulp.task('watch', function () {
   gulp.watch([
        './src/static/pc/less/*.less'
   ], ['lessPC']).on('change', browserSync.reload )

   gulp.watch([
        './src/static/mobile/less/*.less'
   ], ['lessMobile']).on('change', browserSync.reload )

   gulp.watch([
        './src/static/**/*.js'
   ]).on('change', browserSync.reload )
 });

 // 压缩js添加hash
 gulp.task('jsmin', function() {    
  return gulp.src('./src/static/**/*.js')
   .pipe(rev())
   .pipe(uglify())
   .pipe(gulp.dest('./assets')) 
   .pipe(rev.manifest())
   .pipe(gulp.dest('./rev/js'));   
  });

 // 压缩css添加hash
  gulp.task('cssmin', function() {    
    return gulp.src('./src/static/**/*.css')
      .pipe(rev())
      .pipe(minifyCss())
      .pipe(gulp.dest('./assets')) 
      .pipe(rev.manifest())
      .pipe(gulp.dest('./rev/css'));   
    });
  gulp.task('transfer', function(){
    return gulp.src('./src/static/**/images/**/*.*')
    .pipe(gulp.dest('./assets'))
  })
  // 压缩模板, 添加静态资源的hash
  gulp.task('htmlmin',['jsmin', 'cssmin', 'transfer'], function(cb){   
    gulp.src([ './rev/**/*.json', './src/views/**/*.html' ])
    .pipe(revCollector({
        replaceReved:true
    }))
    .pipe(gulp.dest( './assets/template' ));
    cb();
  });


gulp.task('dev', ['browser-sync', 'watch'], function() {
});

gulp.task('build', ['htmlmin'], function() {})


