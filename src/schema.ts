export const typeDefs = `#graphql
    
    type Query {
        me  : User,
        users : [User]
        posts : [Post!]!
        profile : [Profile!]!
    }

    type Mutation {
        signup(name : String!, email : String!, password : String) : UserArgs
    }

    type UserArgs  {
            token : String
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
