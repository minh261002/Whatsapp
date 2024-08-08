import createHttpError from "http-errors";
import logger from "../configs/logger.config.js";
import { createConversation, doesConversationExist, getUserConversations, populatedConversation } from "../services/conversation.service.js";
import { findUser } from "../services/user.service.js";

export const create_open_conversation =async (req, res, next) => {
    try {
        const sender_id = req.user.userId;
        const {receiver_id} = req.body;
        if(!receiver_id){
            logger.error('Please provide receiver_id');
            throw createHttpError.BadGateway("Something went wrong");
        }

        const existed_conversation = await doesConversationExist(sender_id, receiver_id);

        if(existed_conversation){
            res.json(existed_conversation);
        }else{
            let receiver_user = await findUser(receiver_id);
            let convData = {
                name: receiver_user.name,
                picture: receiver_user.picture,
                isGroup: false,
                users: [sender_id, receiver_id],
            };

            const newConv = await createConversation(convData);
            const populatedConv = await populatedConversation(
                newConv._id,
                "users",
                "-password"
            )

            res.status(201).json(populatedConv);
        }
    } catch (error) {
        next(error);
    }
};

export const get_conversations = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const conversations = await getUserConversations(user_id);
        return res.status(200).json(conversations);
    } catch (error) {
        next(error);
    }
};