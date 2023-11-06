import ServerConfig from "../config/serverConfig.js";
import customError from "../utils/Response/CustomError.js";

export const checkBearer = (req, res, next) => {
  const bearerToken = ServerConfig.BEARER_TOKEN;
  const tokenHeader = req.headers["auth_token"];

  if (tokenHeader == bearerToken) {
    next();
  } else {
    return next(customError.createError("Unauthorised request", 401));
  }
};
