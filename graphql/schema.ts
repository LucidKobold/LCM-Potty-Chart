import { gql } from "apollo-server-micro";

const typeDefs = gql`
  scalar Date

  enum Role {
    ADMIN
    USER
  }

  type User {
    id: ID!
    name: String
    role: Role!
    email: String
    emailVerified: Date
    image: String
    createdAt: Date!
    updatedAt: Date!
    # accounts: [Account]!
    # sessions: [Session]!
  }

  type Query {
    users: [User]!
  }
`;

export default typeDefs;
