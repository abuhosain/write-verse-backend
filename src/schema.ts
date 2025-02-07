export const typeDefs = `#graphql
    
    type Query {
        me  : [User!]!
        posts : [Post!]!
        profile : [Profile!]!
    }

    type Mutation {
        signup(name : String!, email : String!, password : String) : User
    }

    type Post {
        id : ID!
        title : String!
        content : String!
        published : Boolean!
        author : User!
        createdAt : String!
    }

    type User {
        id : ID!
        name : String!
        email : String!
        age : Int
        createdAt : String!
        posts : [Post!]
    }

    type Profile {
        id : ID!
        bio : String!
        user : User!
        createdAt : String!
    }
    
`;
