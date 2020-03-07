const Session = {
    participants: (parent, args, { db }) => {
        return [{id: 1, nickname: "mrtkprc", sessionId: 2},
            {id: 3, nickname: "ork", sessionId: 4}]
    }
};

module.exports = Session;
