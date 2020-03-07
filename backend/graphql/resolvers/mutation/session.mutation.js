module.exports = {
    createSession: async (parent, {data: {sessionNumber, description}}, {Session}) => {
        try{
            return await Session({
                sessionNumber,
                description
            }).save();
        }catch (e) {
            throw new Error(e);
        }
    }
};
