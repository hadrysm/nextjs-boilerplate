const { component } = require('./settings');

// Add here more generators
module.exports = (plop) => {
  plop.setGenerator('component', component);
};
