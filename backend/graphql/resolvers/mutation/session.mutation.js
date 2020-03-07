module.exports = {
    createSession: async (parent, {data: {sessionNumber, description}}, {Session}) => {
        try{
            const session = await Session({
                sessionNumber,
                description
            }).save();
            return session;
        }catch (e) {
            throw new Error(e);
        }
    }
};
