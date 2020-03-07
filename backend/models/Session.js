const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionNumber: Number,
    description: String
});

module.exports = mongoose.model('Session', sessionSchema);
