const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
  username:  String,
  password: String,
  secret: String
});

const modelUsers = mongoose.model('users', userSchema);

module.exports = modelUsers
