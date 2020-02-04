const tokenModel = require('./../models/token.js');

const auth = (req, res, next) => {
  // Look through MLab db and find token
  tokenModel.findOne({ token: req.token }).then((token) => {
    if (token) next();
    else res.boom.unauthorized();
  });
};

module.exports = auth;