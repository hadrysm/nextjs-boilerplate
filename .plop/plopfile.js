const { component } = require('./settings');

// Add here more generators
module.exports = function (plop) {
  plop.setGenerator('component', component);
};
