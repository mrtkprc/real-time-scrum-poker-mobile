const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { importSchema } =  require('graphql-import');
const mongoose = require('mongoose');
// resolvers
const resolvers = require('./graphql/resolvers/index');

// importSchema can run properly at version of 0.7.1
const server = new ApolloServer({
	typeDefs: importSchema('./graphql/schema/schema.graphql'),
	resolvers
});

mongoose
	.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('Connected to MongoDB'))
	.catch(e => console.log(e));

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
	console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
