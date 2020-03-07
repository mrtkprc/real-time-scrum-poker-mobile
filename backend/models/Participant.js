const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const participantSchema = new Schema({
    nickname: String,
    sessionId: String
});

module.exports = mongoose.model('Participant', participantSchema);
