const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    sessionNumber: {type: "Number", unique: true},
    description: String
});

module.exports = mongoose.model('Session', sessionSchema);
