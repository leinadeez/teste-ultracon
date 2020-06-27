const gulp = require('gulp')
const sass = require('gulp-sass')
const babel = require('gulp-babel')
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
        .pipe(babel({
            presets: ["@babel/preset-env"]
        }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
})

gulp.task('watch', function(){
    gulp.watch('app/scss/*.scss', gulp.series('sass'))
    gulp.watch('app/scripts/*.js', gulp.series('lint'))
})

gulp.task('build', gulp.series(
    'sass', 'lint'
))

gulp.task('default', gulp.series('build'))
