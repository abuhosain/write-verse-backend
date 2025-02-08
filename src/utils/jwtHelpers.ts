import jwt, { Secret } from "jsonwebtoken";

export const jwtHelper = async (
  payload: { userId: number },
  secrete: Secret
) => {
  const token = jwt.sign(payload, secrete, {
    expiresIn: "1d",
  });
  return token;
};
