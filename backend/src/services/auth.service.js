import  createHttpError from 'http-errors';
import validator from 'validator';
import UserModel from '../models/userModel.js';
import  bcrypt  from 'bcrypt';
const {DEFAULT_PICTURE, DEFAULT_STATUS} = process.env;

export const createUser = async (userData) => {
    const { name, email, picture, status, password } = userData;

    if(!name || !email || !password) {
        throw createHttpError.BadRequest('Missing required fields: name, email, password');
    }

    if(!validator.isLength(name, {min: 1, max: 100})) {
        throw createHttpError.BadRequest('Name must be between 1 and 100 characters long');
    }

    if(status && status.length > 100) {
        throw createHttpError.BadRequest('Status must not be more than 100 characters long');
    }

    if(!validator.isEmail(email)) {
        throw createHttpError.BadRequest('Please enter a valid email');
    }

    const checkUser = await UserModel.findOne({ email });
    if(checkUser) {
        throw createHttpError.Conflict('Email already exists');
    }

    if(!validator.isLength(password, {min: 6})) {
        throw createHttpError.BadRequest('Password must be at least 6 characters long');
    }

    const user = await new UserModel({
        name,
        email,
        picture: picture || DEFAULT_PICTURE,
        status: status || DEFAULT_STATUS,
        password
    }).save();

    return user;
};

export const signUser = async (email, password) => {
    const user = await UserModel.findOne({email: email.toLowerCase()}).lean();
    if(!user){
        throw createHttpError.NotFound('Invalid email or password');
    }

    let passwordMatches = await bcrypt.compare(password, user.password);
    if(!passwordMatches){
        throw createHttpError.NotFound('Invalid email or password');
    }

    return user;
}