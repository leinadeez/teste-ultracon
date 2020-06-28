const gulp = require('gulp')
const sass = require('gulp-sass')
const uglify = require('gulp-uglify')
const eslint = require('gulp-eslint')

gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('dist'))
})

gulp.task('lint', function() {
    return gulp.src('app/scripts/*.js')
        .pipe(eslint({
            'rules': {
                'semi': [1, 'never']
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(gulp.dest('dist/'))
})

gulp.task('uglify', function() {
    return gulp.src('app/scripts/*.js')
        .pipe(eslint({
            'rules': {
                'semi': [1, 'never']
            }
        }))
        .pipe(eslint.format())
        .pipe(eslint.failOnError())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', gulp.series('sass'))
    gulp.watch('app/scripts/main.js', gulp.series('lint'))
})

gulp.task('build', gulp.series(
    'sass', 'uglify'
))

gulp.task('default', gulp.series('build'))
