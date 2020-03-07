const Participant = {
    session: (parent, args, { db }) => {
        return {id: 11, description: "Session under Participant", participants: [{id: 1, nickname: "ork"}]}
    }
};

module.exports = Participant;
