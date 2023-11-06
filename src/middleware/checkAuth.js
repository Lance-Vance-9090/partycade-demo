import jwt from "jsonwebtoken";
import ServerConfig from "../config/serverConfig.js";
import customError from "../utils/Response/CustomError.js";

export const checkAuth = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  if (!tokenHeader) {
    return next(customError.createError("Unauthorised request", 401));
  }
  const token = tokenHeader.split(" ")[1];

  jwt.verify(token, ServerConfig.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(customError.createError("Invalid token", 401));
    }
    req.userId = decoded.id;
    req.email = decoded.email;
    next();
  });
};
