"use strict";
const gulp = require("gulp");
const cached = require("gulp-cached");
const filePath = {
    clientNotTs: `src/client/**/!(*.ts|*.tsx)`,
    componentsNotTs: `components/**/!(*.ts|*.tsx)`,
    staticPath: `static/**/*`
};
gulp.task('move-client-others', () => {
    return gulp.src(filePath.clientNotTs)
        .pipe(cached(filePath.clientNotTs))
        .pipe(gulp.dest('built/src/client'));
});
gulp.task('move-components-others', () => {
    return gulp.src(filePath.componentsNotTs)
        .pipe(cached(filePath.componentsNotTs))
        .pipe(gulp.dest('built/components'));
});
gulp.task('move-static', () => {
    return gulp.src(filePath.staticPath)
        .pipe(cached(filePath.staticPath))
        .pipe(gulp.dest('built/static'));
});
gulp.task('move-static-production', () => {
    return gulp.src(filePath.staticPath)
        .pipe(cached(filePath.staticPath))
        .pipe(gulp.dest('built-production/static'));
});
gulp.task('default', ['move-client-others', 'move-components-others', 'move-static'], () => {
    gulp.watch(filePath.clientNotTs, ['move-client-others']);
    gulp.watch(filePath.componentsNotTs, ['move-components-others']);
    gulp.watch(filePath.staticPath, ['move-static']);
});
gulp.task('production', ['move-client-others', 'move-components-others', 'move-static', 'move-static-production']);
//# sourceMappingURL=gulpfile.js.map