const fs = require('fs');
const path = require('path');

function copyHtaccess() {
  const srcPath = path.join(__dirname, '..', '.htaccess');
  const destPath = path.join(process.cwd(), 'dist', 'my-sales-app', 'browser', '.htaccess');

  fs.copyFile(srcPath, destPath, (err) => {
    if (err) throw err;
    console.log('.htaccess copied successfully.');
  });
}

module.exports = copyHtaccess;
