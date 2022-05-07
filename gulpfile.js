const projectFolder = 'dist';
const sourceFolder = 'src';

const path = {
    build: {
        html: `${projectFolder}`,
        css: `${projectFolder}/css/`,
        js: `${projectFolder}/js/`,
        img: `${projectFolder}/img/`,
    },
    src: {
        html: `${sourceFolder}/*.html`,
        css: [`${sourceFolder}/scss/**/*.scss`, `!${sourceFolder}/_*.scss`],
        js: `${sourceFolder}/js/*.js`,
        img: `${sourceFolder}/img/**/*.{jpg,png,svg}`,
    },
    watch: {
        html: `${sourceFolder}/**/*.html`,
        css: `${sourceFolder}/scss/**/*.scss`,
        js: `${sourceFolder}/js/**/*.js`,
        img: `${sourceFolder}/img/**/*.{jpg,png,svg}`,
    },
    clean: `./${projectFolder}/`,
};

const { src, dest } = require('gulp');
const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const svgSprite = require('gulp-svg-sprite');
const browsersync = require('browser-sync').create();
const del = require('del');

function browserSync() {
    browsersync.init({
        server: {
            baseDir: `./${projectFolder}/`,
        },
        port: 3000,
        notify: false,
    });
}

function clean() {
    return del(path.clean);
}

function html() {
    return src(path.src.html)
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream());
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded',
            }),
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream());
}

function js() {
    return src(path.src.js)
        .pipe(dest(path.build.js));
}

function img() {
    return src(path.src.img)
        .pipe(dest(path.build.img));
}

gulp.task('svgSprite', () => gulp.src([`${sourceFolder}/img/icons/*.svg`])
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../icons/icons.svg',
                example: true,
            },
        },
    }))
    .pipe(dest(path.build.img)));

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
}

const build = gulp.series(clean, html, css, js, img);
const watch = gulp.parallel(build, watchFiles, browserSync);

exports.default = watch;
exports.watch = watch;
exports.build = build;
exports.html = html;
exports.css = css;
exports.js = js;
exports.img = img;
