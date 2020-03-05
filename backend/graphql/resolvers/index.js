// query resolvers
const Query = require('./query/Query');
const Participant = require('./query/Participant');

// mutation resolvers
const Mutation = require('./mutation/index');

module.exports = {
	Query,
	Mutation,
	Participant
};
