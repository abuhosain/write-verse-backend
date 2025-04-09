import { Mutation } from "./Mutation/Mutation";
import { Post } from "./post";
import { Profile } from "./profile";
import { Query } from "./Query/Query";
import { User } from "./user";

export const resolvers = {
  Query,
  Post,
  User,
  Profile,
  Mutation,
};
