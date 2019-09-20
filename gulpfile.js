const {src, dest, series, parallel} = require('gulp');
const del = require('del');
const browserSync = require('browser-sync').create();

const origin = 'src';
const destination = 'build';

async function clean(cb) {
  await del(destination);
  cb();
}

function html(cb) {
  src(`${origin}/**/*.html`).pipe(dest(destination));
  cb();
}

function css(cb) {
  src(`${origin}/css/**/*.css`).pipe(dest(`${destination}/css`));
  cb();
}

function js(cb) {
  src([
    `${origin}/js/lib/bootstrap.bundle.min.js`,
    `${origin}/js/lib/fontawesome-all.min.js`,
    `${origin}/js/lib/jquery.min.js`,
    `${origin}/js/script.js`
  ]).pipe(dest(`${destination}/js`));
  cb();
}

function server(cb) {
  browserSync.init({
    notify: false,
    open: false,
    server: {
      baseDir: destination
    }   
  })
  cb();
}

exports.default = series(clean, parallel(html, css, js), server);