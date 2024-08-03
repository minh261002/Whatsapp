import express from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/register').post(trimRequest.all,register);
router.route('/login').post(trimRequest.all,login);
router.route('/logout').post(trimRequest.all,logout);
router.route('/refresh-token').post(trimRequest.all,refreshToken);
router.get('/me', authMiddleware, (req, res) => {
    res.send('Hello from me');
});

export default router;