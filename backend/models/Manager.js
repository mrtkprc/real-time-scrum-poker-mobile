const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const managerSchema = new Schema({
    nickname: String,
    sessionId: String
});

module.exports = mongoose.model('Manager', managerSchema);
