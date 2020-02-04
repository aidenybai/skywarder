const axios = require('axios');
const decode = require('./decode');
const login = require('./login');

// Expose simplified API
module.exports = (skywardURL) => (user, pass) =>
  login(axios, skywardURL)({ user, pass }).then(decode);
