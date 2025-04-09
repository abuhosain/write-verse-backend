export const Query = {
  users: async (parent: any, args: any, { prisma }: any) => {
    return prisma.user.findMany();
  },
posts : async (parent: any, args: any, { prisma }: any) => {
    return prisma.post.findMany( );
  }
};
