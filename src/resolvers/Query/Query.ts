export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findMany();
  },
};
