const Skye = require('./Skye');

module.exports = (skywardURL = process.env.SKYWARD_URL) => new Skye(skywardURL);