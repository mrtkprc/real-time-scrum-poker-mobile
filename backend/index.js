const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.use("/graphql", new expressGraphQL({
    schema,
    graphiql:true
}));

app.listen(5000, () => {
   console.log("Server Started");
});
