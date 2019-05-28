const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const userFacade = require("./../facades/userFacade")


const schema = buildSchema(`
    type Query {
        getAllUsers: [User]
        findtByUsername(username: String!): User
    }

    type Mutation {
        addUser(user: userInput): User
    }

    type User {
        firstName: String
        lastName: String
        userName: String
        email: String
        job: [Job]
        friends: [ID]
    }

    input JobInput {
        type: String
        company: String
        companyUrl: String
    }

    input userInput {
        firstName: String!
        lastName: String!
        userName: String!
        password: String!
        email: String!
        job: [JobInput]
    }

    type Job { 
        type: String
        company: String
        companyUrl: String
    }
`)



const root = {
    getAllUsers: async () => {
        users = await userFacade.getAllUsers();
        return users
    },
    findtByUsername: async ({username}) => {
        return await userFacade.findByUserName(username)
    },
    addUser: async ({user}) => {
        return await userFacade.addUser(user)
    }
}


function startGraphQL() {
    var app = express();
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true,
    }));
    app.listen(3001, () => console.log('Running a GraphQL API server at localhost:3001/graphql'));
}

module.exports = {startGraphQL}