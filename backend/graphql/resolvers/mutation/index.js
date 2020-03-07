const participant = require('./participant.mutation');
const session = require('./session.mutation');
const manager = require('./manager.mutation');

const Mutation = {
	...participant,
    ...session,
    ...manager
};

module.exports = Mutation;
