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
  type Account {
    id: ID!
    userId: String!
    type: String!
    provider: String!
    providerAccountId: String!
    refresh_token: String
    access_token: String
    expires_at: Int
    token_type: String
    scope: String
    id_token: String
    session_state: String
    oauth_token_secret: String
    oauth_token: String
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
    verifyAccount: VerifyAccount!
    accounts: [Account]!
    sessions: [Session]!
  }

  type VerificationToken {
    identifier: String
    token: String
    createdAt: Date!
    updatedAt: Date!
    expires: Date!
  }

  type VerifyAccount {
    id: String!
    userId: String!
    token: String!
    validated: Boolean!
    validatedAt: Date
    createdAt: Date
    updatedAt: Date!
    expires: Date!
    User: User!
  }

  type Query {
    users: [User]!
    getVerification(activationToken: String!): VerifyAccount!
  }

  type Mutation {
    genVerificationEmail(userId: String!, expires: Date!): VerifyAccount!
    activateAccount(activationToken: String!): VerifyAccount!
  }
`;

export default typeDefs;
export { DateTime };
