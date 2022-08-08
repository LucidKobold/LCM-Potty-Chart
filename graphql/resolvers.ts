const resolvers = {
  Query: {
    users: async (_parent, args, ctx) => await ctx.prisma.user.findMany()
  }
};

export default resolvers;
