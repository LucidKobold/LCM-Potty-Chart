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
      return await ctx.prisma.activationToken.create({
        data: {
          userId: user.id,
          expires: expires
        }
      });
    },
    regenerateActivationToken: async (
      _parent,
      { userId, expires, newToken },
      ctx
    ) => {
      const user = await ctx.prisma.user.findUnique({ where: { id: userId } });
      return await ctx.prisma.activationToken.update({
        where: { userId: user.id },
        data: {
          token: newToken,
          expires: expires
        }
      });
    },
    activateAccount: async (_parent, { activationToken }, ctx) =>
      await ctx.prisma.activationToken.update({
        where: {
          token: activationToken
        },
        data: {
          validated: true,
          validatedAt: new Date()
        }
      })
  },
  User: {
    accounts: async (parent, _args, ctx) =>
      await ctx.prisma.account.findMany({ where: { userId: parent.id } }),
    sessions: async (parent, _args, ctx) =>
      await ctx.prisma.session.findMany({ where: { userId: parent.id } })
  }
};

export default publicResolvers;
