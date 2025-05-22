const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    title: String,
    images: [String],
});

module.exports = mongoose.model('Photo', photoSchema);
