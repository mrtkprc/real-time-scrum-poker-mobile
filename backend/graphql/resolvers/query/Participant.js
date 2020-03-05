const Participant = {
    session: (parent, args, { db }) => {
        return {id: 11, description: "Session under Participant"}
    }
};

module.exports = Participant;
