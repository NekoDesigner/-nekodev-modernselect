const { src, dest } = require('gulp')
const babel = require('gulp-babel')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const rename = require("gulp-rename")
const cleanCSS = require('gulp-clean-css')
const uglify = require('gulp-uglify')

sass.compiler = require('node-sass');

function js(cb) {
    // place code for your default task here
    return src([
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/modernselect.js'
        ])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(dest('dist'))
    cb()
}

function minJS(cb) {
    // place code for your default task here
    return src([
            'node_modules/babel-polyfill/dist/polyfill.js',
            'src/modernselect.js'
        ])
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify())
        .pipe(rename('modernselect.min.js'))
        .pipe(dest('dist'))
    cb()
}

function scss(cb) {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('src/css'))
    cb()
}

function css(cb) {
    return src('src/css/*.css')
        .pipe(autoprefixer({ cascade: false }))
        .pipe(dest('dist'))
    cb()
}

function minCSS(cb) {
    return src('src/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename('modernselect.min.css'))
        .pipe(dest('dist'))
    cb()
}

function indexJS() {
    return src('src/modernselect.js')
        .pipe(rename('index.js'))
        .pipe(dest('./'))
}

exports.js = js
exports.minJS = minJS
exports.indexJS = indexJS

exports.scss = scss
exports.css = css
exports.minCSS = minCSS