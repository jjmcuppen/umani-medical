let config = process.env;

try {
  config = require('../.netlify/environment.json');
}
catch (e) {
}

module.exports = {
  config
};