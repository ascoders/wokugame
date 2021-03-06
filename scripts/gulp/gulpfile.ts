import * as gulp from 'gulp'

const filePath = {
    clientNotTs: `src/client/**/!(*.ts|*.tsx)`,
    componentsNotTs: `components/**/!(*.ts|*.tsx)`,
    staticPath: `static/**/*.*`
}

/**
 * 移动 client 除了 ts 以外的部分
 */
gulp.task('move-client-others', () => {
    return gulp.src(filePath.clientNotTs)
        .pipe(gulp.dest('built/src/client'))
})

/**
 * 移动 components 除了 ts 以外的部分
 */
gulp.task('move-components-others', () => {
    return gulp.src(filePath.componentsNotTs)
        .pipe(gulp.dest('built/components'))
})

/**
 * 移动 static 文件内容
 */
gulp.task('move-static', () => {
    return gulp.src(filePath.staticPath)
        .pipe(gulp.dest('built/static'))
})

/**
 * 移动 static 内容到 production 文件夹下
 */
gulp.task('move-static-production', () => {
    return gulp.src(filePath.staticPath)
        .pipe(gulp.dest('built-production/static'))
})

gulp.task('default', ['move-client-others', 'move-components-others', 'move-static'], () => {
    gulp.watch(filePath.clientNotTs, ['move-client-others'])
    gulp.watch(filePath.componentsNotTs, ['move-components-others'])
    gulp.watch(filePath.staticPath, ['move-static'])
})

gulp.task('production', ['move-client-others', 'move-components-others', 'move-static', 'move-static-production'])