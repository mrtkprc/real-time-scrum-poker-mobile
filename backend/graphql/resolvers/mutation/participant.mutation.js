module.exports = {
	createParticipant: async (parent, {data: {nickname, sessionId}}, {Participant}) => {
		try {
			return await new Participant({
				nickname,
				sessionId
			}).save();
		}catch (e) {
			throw new Error(e);
		}
	}
};
