import userModel from "../db/model/userModel.js";
import CustomError from "../utils/Response/CustomError.js";
import CustomSuccess from "../utils/Response/CustomSuccess.js";

export const editProfile = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (req.file) req.body.avatarUrl = req.file.originalname;

    const user = await userModel
      .findByIdAndUpdate(
        userId,
        {
          ...req.body,
        },
        { new: true }
      )
      .select("-password");
    return next(
      CustomSuccess.createSuccess(user, "Profile Editted Successfully", 200)
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};
