import sendActivationCodeEmail from "../lib/activation/email/sendActivationCodeEmail";
import sendWelcomeEmail from "../lib/activation/email/sendWelcomeEmail";

const publicResolvers = {
  Query: {
    users: async (_parent, _args, ctx) => await ctx.prisma.user.findMany(),
    getVerificationWithToken: async (_parent, { activationToken }, ctx) =>
      await ctx.prisma.activationToken.findUnique({
        where: { token: activationToken }
      }),
    getVerificationWithUserId: async (_parent, { userId }, ctx) =>
      await ctx.prisma.activationToken.findUnique({
        where: { userId: userId }
      })
  },
  Mutation: {
    genVerificationToken: async (_parent, { userId, expires }, ctx) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
      const newToken = await ctx.prisma.activationToken.create({
        data: {
          userId: user.id,
          expires: expires
        }
      });

      if (newToken.token) {
        sendActivationCodeEmail(newToken.token, user.email, user.name);
      }
    },
    regenerateActivationToken: async (
      _parent,
      { userId, expires, newToken },
      ctx
    ) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
      const updatedToken = await ctx.prisma.activationToken.update({
        where: { userId: user.id },
        data: {
          token: newToken,
          expires: expires
        }
      });

      if (updatedToken.token) {
        sendActivationCodeEmail(updatedToken.token, user.email, user.name);
        return updatedToken;
      }
    },
    activateAccount: async (_parent, { activationToken }, ctx) => {
      const activatedToken = await ctx.prisma.activationToken.update({
        where: {
          token: activationToken
        },
        data: {
          validated: true,
          validatedAt: new Date()
        }
      });

      if (activatedToken.validated) {
        const user = await ctx.prisma.user.findUnique({
          where: { id: activatedToken.userId }
        });
        sendWelcomeEmail(user.email, user.name);
      }
    }
  },
  User: {
    accounts: async (parent, _args, ctx) =>
      await ctx.prisma.account.findMany({ where: { userId: parent.id } }),
    sessions: async (parent, _args, ctx) =>
      await ctx.prisma.session.findMany({ where: { userId: parent.id } })
  }
};

export default publicResolvers;
