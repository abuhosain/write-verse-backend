import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelpers";
import config from "../../config";
import { title } from "process";

export interface IUserInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  signup: async (parent: any, args: IUserInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        token: null,
        userError: "User already exist",
      };
    }

    const hashedPassword = await bcrypt.hash(args.password, 12);
    // console.log(hashedPassword);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper.generateToken(
      { userId: newUser.id },
      config.jwt.secrete as string
    );

    return {
      token,
      userError: null,
    };
  },

  signin: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (!user) {
      return {
        token: null,
        userError: "User not found",
      };
    }
    const currectPasssword = await bcrypt.compare(
      args.password,
      user?.password
    );

    if (!currectPasssword) {
      return {
        userError: "Invalid password",
        token: null,
      };
    }

    const token = await jwtHelper.generateToken(
      { userId: user.id },
      config.jwt.secrete as string
    );

    return {
      token,
      userError: null,
    };
  },

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
