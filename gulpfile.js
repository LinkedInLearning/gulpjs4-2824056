const {src, dest} = require('gulp');

function html(cb) {
  src('src/index.html').pipe(dest('build'));
  cb();
}

exports.default = html;