import createHttpError from 'http-errors';
import MessageModel from '../models/messageModel.js';
import ConversationModel from '../models/conversationModel.js';

export const createMessage = async (msgData) => {
    let newMessage = await MessageModel.create(msgData);
    if(!newMessage) throw createHttpError.BadRequest('Oops! Something went wrong');
    return newMessage;
};

export const populatedMessage = async (msgId) => {
    let msg = await MessageModel.findById(msgId).populate({
        path: 'sender',
        select: 'name picture',
        model: 'UserModel'
    }).populate({
        path: 'conversation',
        select: 'name isGroup users',
        model: 'ConversationModel',
        populate: {
            path: 'users',
            select: 'name email picture status',
            model: 'UserModel'
        }
    })

    if(!msg) throw createHttpError.BadRequest('Oops! Something went wrong');
    return msg;
};

export const updateLatestMessage = async (conversationId, newMessage) => {
    const updateConv = ConversationModel.findByIdAndUpdate(conversationId, {
        latestMessage: newMessage,
    });

    if(!updateConv) throw createHttpError.BadRequest('Oops! Something went wrong');

    return updateConv;
};

export const getConvMessages = async (conv_id) => {
    const messages = await MessageModel.find({conversation: conv_id}).populate({
        path: 'sender',
        select: 'name picture email status',
    })
    .populate({
        path: 'conversation',
    });

    if(!messages) throw createHttpError.BadRequest('Oops! Something went wrong');
    return messages;
};