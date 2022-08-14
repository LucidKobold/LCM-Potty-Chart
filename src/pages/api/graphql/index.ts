// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
import { ApolloServer } from "apollo-server-micro";
import typeDefs, { DateTime } from "../../../../graphql/schema";
import resolvers from "../../../../graphql/resolvers";
import context from "../../../../graphql/context";
import Cors from "micro-cors";

const cors = Cors();

const apolloServer = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: {
    Date: DateTime,
    ...resolvers
  },
  introspection: process.env.NODE_ENV !== "production",
  context: context,
  csrfPrevention: true,
  cache: "bounded"
});

const startServer = apolloServer.start();

// * Secured route that makes sure a user is logged in. Re-enable for final production.
// export default cors(async function handler(req, res) {
//   const session = await unstable_getServerSession(req, res, authOptions);

//   console.info(session);

//   if (session) {
//     if (req.method === "OPTIONS") {
//       res.end();
//       return false;
//     }
//     await startServer;

//     await apolloServer.createHandler({
//       path: "/api/graphql"
//     })(req, res);
//   } else {
//     res.status(401).json({ error: "Please login to use the api." });
//     res.end();

//     return;
//   }
// });

export default cors(async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;

  await apolloServer.createHandler({
    path: "/api/graphql"
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false
  }
};
