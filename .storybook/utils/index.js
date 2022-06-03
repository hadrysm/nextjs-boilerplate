const path = require('path');

module.exports = {
  toPath: (filePath) => path.join(process.cwd(), filePath)
};
