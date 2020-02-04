const UidGen = require('uid-generator');
const uidgen = new UidGen(256);

// Throw back a function that returns random token
const uid = () => uidgen.generate();

module.exports = uid;