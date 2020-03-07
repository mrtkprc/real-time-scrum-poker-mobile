const Session = {
    participants: (parent, args, { db }) => {
        return [{id: 1, nickname: "mrtkprc", session_id: 2},
            {id: 3, nickname: "ork", session_id: 4}]
    }
};

module.exports = Session;
