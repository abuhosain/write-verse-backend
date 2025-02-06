export const typeDefs = `#graphql
    
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
