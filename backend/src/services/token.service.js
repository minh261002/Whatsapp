
import { sign, verify } from "../utils/token.util.js";

export const generateToken = async (payload, secret, expiresIn) => {
  let token = await sign(payload, secret, expiresIn);
  return token;
};

export const verifyToken = async (token, secret) => {
  let check = await verify(token, secret);
  return check;
};
