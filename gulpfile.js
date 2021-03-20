import gulp from 'gulp';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import postcssVars from 'postcss-simple-vars';
import postcssNested from 'postcss-nested';
import postcssMixin from 'postcss-mixins';
import postcssImport from 'postcss-import';
import postcssNestedProps from 'postcss-nested-props';
import concat from 'gulp-concat';
import cssnano from 'cssnano';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import imageMin from 'gulp-image';
import del from 'del';

const postcssPlugins = [
    postcssImport(),
    postcssVars(),
    postcssNested(),
    postcssNestedProps(),
    postcssMixin(),
    autoprefixer(),
    cssnano(),
]

const PATHS = {
    styles: './src/assets/styles/main.css',
    js: './src/assets/js/**/*',
    image: './src/assets/image/**/*',
    fonts: './src/assets/fonts/**/*',
    templates: './src/templates/**/*'
}

function cssTask() {
    return gulp.src(PATHS.styles)
           .pipe(postcss(postcssPlugins))
           .pipe(gulp.dest('./dist/styles'))
}

function jsTask() {
    return gulp.src(PATHS.js)
           .pipe(babel())
           .pipe(uglify())
           .pipe(concat('app.build.js'))
           .pipe(gulp.dest('./dist/js'))
}

function htmlTask() {
    return gulp.src(PATHS.templates)
           .pipe(gulp.dest('./dist/templates/'))
}

function imageTask() {
    return gulp.src(PATHS.image)
           .pipe(imageMin())
           .pipe(gulp.dest('./dist/image'))
}

function fontsTask() {
    return gulp.src(PATHS.fonts)
           .pipe(gulp.dest('./dist/fonts'))
}

function watch() {
    gulp.watch(['./src/assets/styles/**/*',], gulp.parallel(cssTask));
    gulp.watch(['./src/assets/js/**/*'], gulp.parallel(jsTask));
    gulp.watch(['./src/assets/fonts/**/*'], gulp.parallel(fontsTask));
    gulp.watch(['./src/assets/image/**/*'], gulp.parallel(imageTask));
    gulp.watch(['./src/templates/**/*'], gulp.parallel(htmlTask));
}

async function cleanBuild() {
    let delPaths = await del('./dist'); 

    return delPaths;
}

export default gulp.series(
    cleanBuild,
    gulp.parallel(
        cssTask, 
        jsTask, 
        htmlTask, 
        imageTask, 
        fontsTask
    ),
    watch
);