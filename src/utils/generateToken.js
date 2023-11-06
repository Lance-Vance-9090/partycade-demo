import jwt from "jsonwebtoken";
import ServerConfig from "../config/serverConfig.js";

export const generateToken = (payload) => {
  const { email, id } = payload;

  const token = jwt.sign(
    {
      email: email,
      id: id,
    },
    ServerConfig.JWT_SECRET,
    {
      expiresIn: ServerConfig.EXPIRES_IN,
    }
  );
  return token;
};
