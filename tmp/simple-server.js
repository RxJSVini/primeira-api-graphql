"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const node_crypto_1 = require("node:crypto");
const typeDefs = (0, apollo_server_1.gql) `
    type Query{
        users:[String!]!
    }
    
    type Mutation {
        createUser(name:String!):String!
    }
`;
const users = [];
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return users;
            }
        },
        Mutation: {
            createUser: (_, args) => {
                const user = {
                    id: (0, node_crypto_1.randomUUID)(),
                    name: args.name
                };
                users.push(user);
                return user;
            }
        }
    }
});
server.listen().then(({ url }) => {
    console.log(`HTTP server running on ${url} 🚀`);
});
