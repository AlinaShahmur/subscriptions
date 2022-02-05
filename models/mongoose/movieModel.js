const mongoose = require('mongoose');

const movieModel = new mongoose.Schema({
    name: String,
    premiered: Number,
    genres: [String],
    img: String,
    // subscriptions: [{ type: mongoose.Schema.Types.String, ref: 'subscriptions' }]
})

module.exports = mongoose.model('movies', movieModel)