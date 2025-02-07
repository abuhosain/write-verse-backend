import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { sign } from "crypto";

const prisma = new PrismaClient();

interface IUserInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async (parent: any, args: any, context: any) => {
      return prisma.user.findMany();
    },
  },

  Mutation: {
    signup: async (parent: any, args: IUserInfo, context: any) => {
      const hashedPassword = await bcrypt.hash(args.password, 12);
      console.log(hashedPassword);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      const token = jwt.sign({ userId: newUser.id }, "signingKey", {
        expiresIn: "1d",
      });

      return {
        token,
        userError: null,
      };
    },

    signin: async (parent: any, args: any, context: any) => {
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

      const token = jwt.sign({ userId: user.id }, "signingKey", {
        expiresIn: "1d",
      });

      return {
        token,
        userError: null,
      };
    },
  },
};
