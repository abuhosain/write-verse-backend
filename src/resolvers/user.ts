export const User = {
    posts: async (parent: any, args: any, { prisma }: any) => {
        return await prisma.post.findMany({
        where: {
            authorId: parent.id,
        },
        });
    },
    profile: async (parent: any, args: any, { prisma }: any) => {
        return await prisma.profile.findUnique({
        where: {
            userId: parent.id,
        },
        });
    },
}