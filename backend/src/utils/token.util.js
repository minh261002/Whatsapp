import jwt from 'jsonwebtoken';
import logger from '../configs/logger.config.js';

export const sign = async (payload, secret, expiresIn) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {expiresIn}, (err, token) => {
            if (err) {
                logger.error(err);
                reject(err);
            }else{
            resolve(token);
            }
        });
    });
};

export const verify = async (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                logger.error(err);
                resolve(null);
            }else{
            resolve(decoded);
            }
        });
    });
};

