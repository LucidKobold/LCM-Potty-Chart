const adminResolvers = {
  Query: {
    users: async (_parent, _args, ctx) => await ctx.prisma.user.findMany()
  },
  User: {
    accounts: async (parent, _args, ctx) =>
      await ctx.prisma.account.findMany({ where: { userId: parent.id } }),
    sessions: async (parent, _args, ctx) =>
      await ctx.prisma.sessions.findMany({ where: { userId: parent.id } })
  }
};

export default adminResolvers;
