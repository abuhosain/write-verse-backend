  export const Query = {
      me: async(parent : any,arg : any, {prisma, userInfo} : any) => {
      return await prisma.user.findUnique({
        where : {
          id : userInfo.userId
        } 
      });
      },  
      users: async (parent: any, args: any, { prisma }: any) => {
      return prisma.user.findMany();
    },
      posts : async (parent: any, args: any, { prisma }: any) => {
      return prisma.post.findMany({
        where : {
          published : true
        }
      });
    }
  };
