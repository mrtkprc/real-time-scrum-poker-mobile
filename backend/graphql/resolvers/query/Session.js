const Session = {
    participants: (parent, args, { Participant }) => {
        console.log(parent);
        return Participant.find({sessionId: parent._id});
    }
};

module.exports = Session;
