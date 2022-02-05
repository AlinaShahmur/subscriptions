const mongoose = require('mongoose');

const memberModel = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    // subscriptions: [{ type: mongoose.Schema.Types.String, ref: 'subscriptions' }]
})

module.exports = mongoose.model('members', memberModel)