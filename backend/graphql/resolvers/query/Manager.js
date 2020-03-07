const Manager = {
    session: (parent, args, { Session }) => {
        return Session.findById(parent.sessionId);
    }
};

module.exports = Manager;
