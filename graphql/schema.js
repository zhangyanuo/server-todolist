const {gql} =require('apollo-server-express');
const { GraphQLScalarType } = require("graphql");


const typeDefs = gql`
    type todo {
        _id: ID!
        name: String!
        isEdit: Boolean!
        status:Int!
    }
    type Query {
        todoList: [todo]!
    }
    type updateResponse {
        success: Boolean!
        todoList:[todo]!
    }
    type Mutation {
        addTodo(name: String): updateResponse!
        setCompleted(_id: [ID]!): updateResponse!
        deleteTodo(_id: [ID]!): updateResponse!
        editTodo(_id:ID!,name:String!):updateResponse!
    }
`;
module.exports = typeDefs;