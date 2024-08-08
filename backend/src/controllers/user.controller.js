import createHttpError from "http-errors";
import { searchUsers as searchUsersServives} from "../services/user.service.js";

export const searchUser = async (req, res, next) => {
    try {
        const keyword = req.query.search;
        if(!keyword) throw createHttpError.BadRequest('Search query is required');

        const users = await searchUsersServives(keyword, req.user.userId);
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
}