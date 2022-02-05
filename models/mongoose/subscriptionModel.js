const mongoose = require('mongoose');

const subscriptionModel = new mongoose.Schema({
    movie: { type: mongoose.Schema.Types.String, ref: 'movies' },
    member: { type: mongoose.Schema.Types.String, ref: 'members' },
    date: Date
})


module.exports = mongoose.model('subscriptions', subscriptionModel)