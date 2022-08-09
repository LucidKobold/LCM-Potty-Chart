import { objectType } from "nexus";
import User from "./User";

const Session = objectType({
  name: "Session",
  definition(t) {
    t.id("id");
    t.string("sessionToken");
    t.string("userId");
    t.date("expires");
    t.date("createdAt");
    t.date("updatedAt");
    // t.field("user", {
    //   type: User,
    //   async resolve(parent, _args, ctx) {
    //     return await ctx.prisma.user
    //       .findUnique({
    //         where: {
    //           id: parent.userId
    //         },
    //         include: {
    //           sessions: false,
    //           accounts: false
    //         }
    //       })
    //       .sessions();
    //   }
    // });
  }
});

export default Session;
