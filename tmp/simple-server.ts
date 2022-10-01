import { ApolloServer, gql } from "apollo-server";
import { randomUUID } from "node:crypto";



/*
*  Under fetching
*  Rota HTTP que retorna dado de menos
*   
*  Over Fetching
*  Rota HTTP que retorna mais dados do que precisamos.
*/

/*
    Schema first approach
    Schema criado antes do código.

    Code First
    Schema criada de forma automática, com base no código.

*/

interface User {
    id:string;
    name:string;
}
const typeDefs = gql`
    type Query{
        users:[String!]!
    }
    
    type Mutation {
        createUser(name:String!):String!
    }
`;

const users:User[] = []

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query:{
            users:() =>{
                return users
            }
        },
        Mutation:{
            createUser:(_, args) =>{


                const user = {
                    id:randomUUID(),
                    name:args.name
                };

                users.push(user);

                return user;
            }
        }
    }
});

server.listen().then(({ url }) =>{
    console.log(`HTTP server running on ${url} 🚀`)
})