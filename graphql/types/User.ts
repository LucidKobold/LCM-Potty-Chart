import { enumType, extendType, objectType } from "nexus";
import Account from "./Account";
import Session from "./Session";

const Role = enumType({
  name: "Role",
  members: ["ADMIN", "USER"]
});

const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("name");
    t.field("role", { type: Role });
    t.string("email");
    t.date("emailVerified");
    t.string("image");
    t.date("createdAt");
    t.date("updatedAt");
    t.list.field("accounts", {
      type: Account,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.account.findMany({
          where: {
            userId: parent.id
          },
          include: {
            user: false
          }
        });
      }
    });
    t.list.field("sessions", {
      type: Session,
      async resolve(parent, _args, ctx) {
        return await ctx.prisma.session.findMany({
          where: {
            userId: parent.id
          },
          include: {
            user: false
          }
        });
      }
    });
  }
});

const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.user.findMany();
      }
    });
  }
});

export default User;
export { UserQuery };
