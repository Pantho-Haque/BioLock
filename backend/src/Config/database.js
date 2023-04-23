const fs = require('fs');

module.exports = {
  readData: (path) => {
    if (fs.existsSync(path)) {
      return fs.promises.readFile(path, 'utf8');
    } else {
      return null;
    } 
  },
  writeData: (path, data) => {
    fs.writeFileSync(path, data);
  },
  clearData: (path) => {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  },
  fileExists: (path) => {
    return fs.existsSync(path);
  }
};
