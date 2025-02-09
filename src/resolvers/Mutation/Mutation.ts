import { authResolvers } from "./auth";

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  ...authResolvers,
  addPost: async (parent: any, args: any, { prisma, userInfo }: any) => {
    if (!userInfo) {
      return {
        userError: "User not authenticated",
        post: null,
      };
    }

    if (!args.title || !args.content) {
      return {
        userError: "Title and content is required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userInfo.userId,
      },
    });

    return {
      userError: null,
      post: newPost,
    };
  },
};
