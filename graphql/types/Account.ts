import { objectType } from "nexus";
import User from "./User";

const Account = objectType({
  name: "Account",
  definition(t) {
    t.id("id");
    t.string("userId");
    t.string("type");
    t.string("provider");
    t.string("providerAccountId");
    t.string("refresh_token");
    t.string("access_token");
    t.int("expires_at");
    t.string("token_type");
    t.string("scope");
    t.string("id_token");
    t.string("session_state");
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
    //       .accounts();
    //   }
    // });
  }
});

export default Account;
