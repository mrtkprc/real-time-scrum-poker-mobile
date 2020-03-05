const participant = require('./participant.mutation');
const session = require('./session.mutation');

const Mutation = {
	...participant,
    ...session
};

module.exports = Mutation;
