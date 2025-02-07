import jwt from "jsonwebtoken";

export const jwtHelper = async (payload: { userId: number }) => {
  const token = jwt.sign(payload, "signingKey", {
    expiresIn: "1d",
  });
  return token;
};
