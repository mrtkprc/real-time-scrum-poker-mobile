const Participant = {
    session: (parent, args, { Session }) => {
        return Session.findById(parent.sessionId);
    }
};

module.exports = Participant;
