const { Schema, model } = require('mongoose');

// Register a schema for token
const TokenSchema = new Schema({
  token: String
});

// Model and export
const Token = model('Token', TokenSchema);

module.exports = Token;