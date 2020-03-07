module.exports = {
    createManager: async (parent, {data: {nickname, sessionId}}, {Manager}) => {
        try{
            return await new Manager({
                nickname,
                sessionId
            }).save();

        }catch(e){
            throw new Error(e);
        }
    }
};
