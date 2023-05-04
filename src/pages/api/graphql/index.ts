// import { unstable_getServerSession } from "next-auth";
// import { authOptions } from "../auth/[...nextauth]";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../../lib/prisma";
import typeDefs, { DateTime } from "../../../../graphql/schema";
import resolvers from "../../../../graphql/resolvers";

export type Context = {
  prisma: PrismaClient;
};

const apolloServer = new ApolloServer<Context>({
  typeDefs,
  resolvers: {
    Date: DateTime,
    ...resolvers
  },
  csrfPrevention: true,
  cache: "bounded"
});

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

export default startServerAndCreateNextHandler(apolloServer, {
  context: async (req, res) => ({ req, res, prisma })
});
