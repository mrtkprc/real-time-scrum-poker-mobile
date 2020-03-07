const Manager = {
    session: (parent, args, { db }) => {
        return {id: 11, description: "Session under Participant"}
    }
};

module.exports = Manager;
