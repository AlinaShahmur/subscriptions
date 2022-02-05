const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: String,
    userName: String,
    password: String
})

module.exports = mongoose.model('users', UserSchema)