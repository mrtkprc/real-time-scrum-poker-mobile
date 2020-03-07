// query resolvers
const Query = require('./query/Query');
const Participant = require('./query/Participant');
const Session = require('./query/Session');
const Manager = require('./query/Manager');

// mutation resolvers
const Mutation = require('./mutation/index');

module.exports = {
	Query,
	Mutation,
	Participant,
	Session,
	Manager
};
