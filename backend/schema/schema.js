const graphql = require('graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = graphql;

const SessionType = new GraphQLObjectType({
    name: "Session",
    fields: () => ({
        id: {type: GraphQLID},
        description: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields:{
        session:{
            type: SessionType,
            args:{ id: { type: GraphQLID } },
            resolve(parent, args){
                return {id: "1", description: "Mert KOPRUCU"}
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields:{
        addSession:{
            type:SessionType,
            args:{
                id:{ type: GraphQLID},
                description:{type: GraphQLString}
            },
            resolve(parent, args){
                return {id: args.id, description: args.description}
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
