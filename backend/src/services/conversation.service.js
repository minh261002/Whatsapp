import createHttpError from "http-errors";
import ConversationModel from "../models/conversationModel.js";
import UserModel from "../models/userModel.js";

export const doesConversationExist = async(sender_id, receiver_id) => {
    let convs = await ConversationModel.find({
        isGroup: false,
        $and: [
            {users: {$elemMatch: {$eq: sender_id}}},
            {users: {$elemMatch: {$eq: receiver_id}}}
        ]
    })
    .populate('users', '-password')
    .populate('latestMessage');

    if(!convs) throw createHttpError.BadRequest('Oops! Something went wrong');

    convs = await UserModel.populate(conv, {
        path: 'latestMessage.sender',
        select: 'name email picture status'
    });

    return convs[0];
};

export const createConversation = async(convData) => {
    const newConv = await ConversationModel.create(convData);   
    if(!newConv) throw createHttpError.BadRequest('Oops! Something went wrong');
    return newConv;
};

export const populatedConversation = async(id, fieldToPopulate, fieldToRemove) => {
    const populateConv = await ConversationModel.findOne({_id: id})
    .populate(fieldToPopulate, fieldToRemove);

    if(!populateConv) throw createHttpError.BadRequest('Oops! Something went wrong');
    return populateConv;
};

export const getUserConversations = async(user_id) => {
    let conversations;
    await ConversationModel.find({
        users: {$elemMatch: {$eq: user_id}}
    })
    .populate('users', '-password')
    .populate('admin', '-password')
    .populate('latestMessage')
    .sort({updatedAt: -1})
    .then(async(results) => {
        results = await UserModel.populate(results, {
            path: 'latestMessage.sender',
            select: 'name email picture status'
        });

        conversations = results;
    }).catch(err => {
        throw createHttpError.BadRequest('Oops! Something went wrong');
    });
};