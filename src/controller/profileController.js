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

export const getProfile = async (req, res, next) => {
  try {
    const { userId } = req;

    const userProfile = await userModel
      .findById(userId)
      .select("avatar name -_id coins coinsSpent");

    if (!userProfile) {
      return next(CustomError.createError("Profile not found", 404));
    }

    return next(
      CustomSuccess.createSuccess(
        userProfile,
        "Profile fetched successfully",
        200
      )
    );
  } catch (error) {
    return next(CustomError.createError(error.message, 500));
  }
};
