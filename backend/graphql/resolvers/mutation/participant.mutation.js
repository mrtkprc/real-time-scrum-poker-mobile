module.exports = {
	createParticipant: async (parent, {data: {nickname, sessionId}}, {Participant}) => {
		try {
			const participant = await new Participant({
				nickname,
				sessionId
			}).save();
			return participant;
		}catch (e) {
			throw new Error(e);
		}
	}
};
