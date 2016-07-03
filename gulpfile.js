var gulp = require('gulp')
var gulpTypescript = require('gulp-typescript')
var typescript = require('typescript')
var nodemon = require('gulp-nodemon')
var cached = require('gulp-cached')
var exec = require('child_process').exec
var tsServerProject = gulpTypescript.createProject('./tsconfig.json', {typescript: typescript})
var tsClientProject = gulpTypescript.createProject('./tsconfig.json', {typescript: typescript})
var gulpHtmlDev = require('./scripts/gulp/gulp-html-dev')
var gulpJsPathReplace = require('./scripts/gulp/gulp-js-path-replace')

/**
 * 编译 server 文件
 */
gulp.task('server', function () {
    return gulp.src('server/**')
        .pipe(cached('scripts')) // 只传递修改过的文件
        .pipe(gulpTypescript(tsServerProject))
        .pipe(gulp.dest('output/server'))
})

/**
 * 编译 client tsx 文件,后端渲染时用
 */
gulp.task('client-tsx', function () {
    return gulp.src('client/**/*.tsx')
        .pipe(cached('client')) // 只传递修改过的文件
        .pipe(gulpJsPathReplace('client'))
        .pipe(gulpTypescript(tsClientProject))
        .pipe(gulp.dest('output/client'))
})

/**
 * 编译 client html 文件,后端渲染时用
 */
gulp.task('client-html', function () {
    return gulp.src('client/**/*.html')
        .pipe(cached('client')) // 只传递修改过的文件
        .pipe(gulpHtmlDev())
        .pipe(gulp.dest('output/client'))
})

/**
 * 编译 client html 文件,后端渲染时用
 * production
 */
gulp.task('client-html-production', function () {
    return gulp.src('client/**/*.html')
        .pipe(cached('client')) // 只传递修改过的文件
        .pipe(gulp.dest('output/client'))
})

/**
 * 监听 server 文件改变自动触发构建
 */
gulp.task('watch', function () {
    gulp.watch('server/**/*.ts', ['server'])
})

/**
 * nodemon 监听 server 热更新
 */
gulp.task('nodemon', ['server'], function () {
    return nodemon({
        script: 'output/server/index.js',
        watch : 'output/server',
        env   : {'NODE_ENV': 'development'}
    })
})

/**
 * 开发状态
 */
gulp.task('default', ['client-tsx', 'client-html', 'watch', 'nodemon'])

/**
 * 上线编译
 */
gulp.task('production', ['client-tsx', 'client-html-production', 'server'])