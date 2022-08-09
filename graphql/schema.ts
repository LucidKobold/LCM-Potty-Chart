import { asNexusMethod, makeSchema } from "nexus";
import { dateScalar as date } from "./scalars";
import * as types from "./types";
import { join } from "path";

export const DateTime = asNexusMethod(date, "date");

const schema = makeSchema({
  types: [DateTime, types],
  outputs: {
    typegen: join(
      process.cwd(),
      "node_modules",
      "@types",
      "nexus-typegen",
      "index.d.ts"
    ),
    schema: join(process.cwd(), "graphql", "schema.graphql")
  },
  contextType: {
    export: "Context",
    module: join(process.cwd(), "graphql", "context.ts")
  }
});

export default schema;

// import { gql } from "apollo-server-micro";

// const typeDefs = gql`
//   scalar Date

//   enum Role {
//     ADMIN
//     USER
//   }

//   type User {
//     id: ID!
//     name: String
//     role: Role!
//     email: String
//     emailVerified: Date
//     image: String
//     createdAt: Date!
//     updatedAt: Date!
//     # accounts: [Account]!
//     # sessions: [Session]!
//   }

//   type Query {
//     users: [User]!
//   }
// `;

// export default typeDefs;
