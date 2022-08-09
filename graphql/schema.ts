import { gql } from "apollo-server-micro";
import { GraphQLScalarType } from "graphql";

const DateTime = new GraphQLScalarType({
  name: "Date",
  description: "Date scalar",
  parseValue(value: string) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.toJSON();
  }
});

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
    accounts: [Account]!
    sessions: [Session]!
  }

  type Account {
    id: ID!
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    scope: String
    id_token: String
    session_state: String
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  type Session {
    id: ID!
    sessionToken: String!
    userId: String!
    expires: Date!
    createdAt: Date!
    updatedAt: Date!
    user: User!
  }

  type Query {
    users: [User]!
  }
`;

export default typeDefs;
export { DateTime };
