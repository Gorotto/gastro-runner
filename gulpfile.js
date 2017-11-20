var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет,
    pug = require('gulp-pug'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync').create(), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    rename = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    spritesmith = require('gulp.spritesmith'), // Подключаем библиотеку для создания png-спрайтов
    svgstore = require('gulp-svgstore'),//// Подключаем библиотеку для объединения SVG в один файл
    svgmin = require('gulp-svgmin'),//Подключаем библиотеку для минификации SVG
    cache = require('gulp-cache'), // Подключаем библиотеку кеширования
    extender = require('gulp-html-extend'),//Подключаем бибилиотеку для склейки html-файлов
    sourcemaps = require('gulp-sourcemaps'),//Подключаем плагин, записывающий карту источника в исходный файл
    rimraf = require('rimraf'),//Очищает указанные исходники
    plumber = require('gulp-plumber');//Подключаем плагин, который не останавливает задачи от остановки во время их выполнения при возникновении ошибки


var postcss = require('gulp-postcss'),//Блиотека-парсер стилей для работы с postcss-плагинами
    autoprefixer = require('autoprefixer'),// Подключаем библиотеку для автоматического добавления префиксов
    cssnano = require('cssnano'),//postcss-плагин, для минификации CSS кода, идущего на продакшен.
    pxtorem = require('postcss-pxtorem'),//postcss-плагин, для перевода px в rem, идущего на продакшен.
    pxtoem = require('postcss-px-to-em'),//postcss-плагин, для перевода px в em, идущего на продакшен.
    short = require('postcss-short'),
    stylefmt = require('stylefmt'),
    assets = require('postcss-assets'),
    shortspacing = require('postcss-short-spacing'),
    focus = require('postcss-focus'),//postcss-плагин, делающие стили :hover и :focus одинаковыми.
    sorting = require('postcss-sorting'),
    fontmagic = require('postcss-font-magician'),
    fixes = require('postcss-fixes');

let pages = [
  'app/pug/pages/gastro-runner/gastro-runner.pug',
  'app/pug/pages/earnings-gastro/earnings-gastro.pug',
  'app/pug/pages/upload-card/upload-card--front.pug',
  'app/pug/pages/upload-card/upload-card--back.pug',
  'app/pug/pages/cooperation/cooperation.pug',
  'app/pug/pages/enter--admin/enter--admin.pug',
  'app/pug/pages/register/register.pug',
  'app/pug/pages/profile/profile.pug',
  'app/pug/pages/profile/view-profile.pug',
  'app/pug/pages/admin/history.pug',
  'app/pug/pages/admin/add-dealer.pug',
  'app/pug/pages/admin/my-orders.pug',
  'app/pug/pages/admin/list-dealer.pug',
  'app/pug/pages/admin/maps.pug',
  'app/pug/pages/couriers/list-couriers.pug',
  'app/pug/pages/couriers/profile-couriers.pug',
  'app/pug/pages/couriers/add-couriers.pug',
  'app/pug/pages/couriers/settings-couriers.pug',


];
gulp.task('css-libs', function () { // Создаем таск css-libs
    var processors = [
        cssnano
    ]
    return gulp.src([
        'app/libs/**/*.css'
    ]) // Берем источник
        .pipe(postcss(processors))// сжымаем
        .pipe(concat('libs.min.css'))// объеденяем в файл
        .pipe(gulp.dest('css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({
            stream: true
        })); // Обновляем CSS на странице при изменении
});

// Get sprite from images
gulp.task('sprite', (cb) => {
    let spriteData = gulp.src(['app/img/**/*.png']).pipe(spritesmith({
        imgName: '../img/sprite.png',
        cssName: '_sprite.scss',
        algorithm: 'top-down'
    }));
      spriteData.css.pipe(gulp.dest('app/sass/sprite'));
      spriteData.img.pipe(gulp.dest('img/'));
});



gulp.task('sass', function () { // Создаем таск Sass
    var processors = [// подключаем постпроцессоры в массиве
        assets,
        short,
        fontmagic,
        fixes,
        autoprefixer(['last 5 versions', '> 5%', 'ie 8', 'ie 7', 'ie 9', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'], {
            cascade: true
        }),
        /*pxtorem({
            rootValue: 14,
            replace: false
        }),
        pxtoem({
            rootValue: 14,
            replace: false
        }),*/
        /*focus,*/
        sorting(),
        stylefmt
        // cssnano
    ];
    return gulp.src('app/sass/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        // .pipe(rename({
        //     suffix: ".min",
        //     extname: ".css"
        // }))
        .pipe(sourcemaps.write('.', {sourceRoot: 'css-source'}))
        .pipe(plumber.stop())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('compress', ['clean'], function () {// Создаем таск compress
    return gulp.src('app/js/*.js')// Берем все необходимые библиотеки
        .pipe(plumber())
        .pipe(concat('script.js'))// Собираем их в кучу в новом файле script.js
        // .pipe(rename({
        //     suffix: ".min",// Добавляем суффикс .min
        //     extname: ".js"// Добавляем окончание .js
        // }))
        // .pipe(uglify()) // Сжимаем JS файл
        .pipe(plumber.stop())
        .pipe(gulp.dest('js'));// Выгружаем в папку js

});

gulp.task('pug', () => {
  return gulp.src(pages)
      .pipe(pug({pretty: true}))
      .on('error', notify.onError(function(error) {
        return `An error occurred while compiling pug.\nLook in the console for details.\n ${error}`;
      }))
      .pipe(gulp.dest('./'))
      .pipe(browserSync.stream());
});

gulp.task("clean", function (cb) {
    rimraf('./js/script.min.js', cb);
});

gulp.task('extend-pages', function () {
    gulp.src('./app/html/pages/*.html')
        .pipe(extender({annotations: true, verbose: false})) // default options
        .pipe(gulp.dest('./'))
});

gulp.task('extend-blocks', function () {
    gulp.src('./app/html/*.html')
        .pipe(extender({annotations: true, verbose: false})) // default options
        .pipe(gulp.dest('./'))
});

gulp.task('watch', ['browser-sync', 'pug', 'compress',/* 'extend-pages',*/ 'css-libs', 'img', 'sass'/*, 'sprite'*/], function () {
    gulp.watch(['./app/pug/pages/*.pug', './app/pug/pages/**/*.pug'], ['pug']);
    gulp.watch('app/libs/**/*', ['css-libs']); // Наблюдение за папкой libs
    gulp.watch('app/img/**/*', ['img']);// Наблюдение за папкой img
    gulp.watch('app/sass/**/*.scss', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch(['app/html/**/*.html'], ['extend-pages']);// Наблюдение за HTML-файлами в папке html
    gulp.watch('app/js/**/*.js', ['compress']); // Наблюдение за js-файлами
});


gulp.task('img', function () {
    return gulp.src('app/img/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('img'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('clear', function (callback) {
    return cache.clearAll();
});

gulp.task('default', ['watch']);

/*
 npm i gulp gulp-sass gulp-pug gulp-notify browser-sync gulp-concat gulp-uglifyjs gulp-rename del gulp-imagemin imagemin-pngquant gulp.spritesmith gulp-svgstore gulp-svgmin gulp-cache gulp-html-extend gulp-sourcemaps rimraf gulp-plumber gulp-postcss autoprefixer cssnano postcss-pxtorem postcss-px-to-em postcss-short stylefmt postcss-assets postcss-short-spacing postcss-focus postcss-sorting postcss-font-magician postcss-fixes stylelint-config-standard --save-dev*/
