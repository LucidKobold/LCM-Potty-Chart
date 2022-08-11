const resolvers = {
  Query: {
    users: async (_parent, _args, ctx) => await ctx.prisma.user.findMany()
  }
};

export default resolvers;
