import createHttpError from "http-errors";
import UserModel from "../models/userModel.js";

export const findUser = async (userId) => {
    const user = await UserModel.findById(userId);

    if (!user) {
        throw createHttpError.BadRequest("Please login to continue");
    }

    return user;
}

export const searchUsers = async(keyword, userId) => {
    const users = await UserModel.find({
        $or: [
            { name: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } }
        ]
    }).find({ _id: { $ne: userId } });

    return users;
};