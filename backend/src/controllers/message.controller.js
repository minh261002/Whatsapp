import logger from "../configs/logger.config.js";
import { createMessage, populatedMessage, updateLatestMessage, getConvMessages } from "../services/message.service.js";

export const sendMessage = async (req, res, next) => {
    try {
        const user_id = req.user.userId;
        const { conversationId, message, files   } = req.body;

        if(!conversationId && (!message || !files)) {
            logger.error('Invalid request');
            return res.sendStatus(400);
        }

        const msgData={
            sender: user_id,
            message,
            conversation: conversationId,
            files: files || []
        }

        let newMessage = await createMessage(msgData);
        let populateMessage = await populatedMessage(newMessage._id);
        await updateLatestMessage(conversationId, newMessage);
        
        return res.status(201).json(populateMessage);
    } catch (error) {
        next(error);
    }
}

export const getMessages = async (req, res, next) => {
    try {
        const {conv_id} = req.params;
        if(!conv_id) {
            logger.error('Invalid request');
            return res.sendStatus(400);
        }
        
        const mesages = await getConvMessages(conv_id);

        return res.status(200).json(mesages);
    } catch (error) {
        next(error);
    }
}