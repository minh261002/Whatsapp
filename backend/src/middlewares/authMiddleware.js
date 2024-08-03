import createHttpError from "http-errors";
import jwt from 'jsonwebtoken';

export default async function (req, res, next) {
    if(!req.headers['authorization']) {
        return next(createHttpError.Unauthorized('Please login to continue'));
    }

    const bearerToken = req.headers['authorization'];
    const token = bearerToken.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, payload) => {
        if(error){
           return next(createHttpError.Unauthorized());
        }

        req.user = payload;
        next();
    });
};