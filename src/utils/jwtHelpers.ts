import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (payload: { userId: number }, secrete: Secret) => {
  const token = jwt.sign(payload, secrete, {
    expiresIn: "1d",
  });
  return token;
};

const getUserFromToken = async (token: string) => {
  try {
    const user = jwt.verify(token, config.jwt.secrete as string) as {
      userId: number;
    };
    return user;
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserFromToken,
};
