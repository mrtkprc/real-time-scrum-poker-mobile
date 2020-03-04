const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { importSchema } =  require('graphql-import');

// resolvers
const resolvers = require('./graphql/resolvers/index');

// importSchema can run properly at version of 0.7.1
const server = new ApolloServer({
	typeDefs: importSchema('./graphql/schema/schema.graphql'),
	resolvers
});

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
