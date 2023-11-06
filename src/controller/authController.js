import customError from "../utils/Response/customError.js"
import customSuccess from "../utils/Response/customSuccess.js"
export const signUp = async (req, res, next) => {
  try {
    
  } catch (error) {
    return next(customError.createError(error.message, 400))
  }
};
