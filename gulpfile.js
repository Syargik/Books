let project_folder = "dist";
let source_folder = "src";

let path = {
  build: {
    html: project_folder + "",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/"
  },
  src: {
    html: source_folder + "/*.html",
    css: [source_folder + "/scss/**/*.scss", "!" + source_folder + "/_*.scss"],
    js: source_folder + "/js/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg}"
  },
  watch: {
    html: source_folder + "/**/*.html",
    css: source_folder + "/scss/**/*.scss",
    js: source_folder + "/js/**/*.js",
    img: source_folder + "/img/**/*.{jpg,png,svg}"
  }, 
  clean: "./" + project_folder + "/"
}

let {src, dest} = require('gulp'),
  gulp = require('gulp'),
  scss = require('gulp-sass')(require('sass')),
  svgSprite = require('gulp-svg-sprite'),
  browsersync = require('browser-sync').create(),
  del = require('del');

function browserSync () {
  browsersync.init ({
    server: {
      baseDir: "./" + project_folder + "/"
    },
    port:3000,
    notify:false
  })
}

function clean () {
  return del(path.clean);
}

function html() {
  return src(path.src.html)
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      scss({
        outputStyle: "expanded"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
}

function img() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
}

gulp.task('svgSprite', function () {
  return gulp.src([source_folder + '/img/icons/*.svg'])
    .pipe(svgSprite ({
      mode: {
        stack: {
          sprite: "../icons/icons.svg",
          example: true
        }
      },
    }))
    .pipe(dest(path.build.img))
})

function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.img], img);
}

let build = gulp.series(clean, html, css, js, img);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.default = watch;
exports.watch = watch;
exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;