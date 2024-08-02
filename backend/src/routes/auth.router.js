import express from 'express';
import { login, logout, refreshToken, register } from '../controllers/auth.controller.js';
import trimRequest from 'trim-request';

const router = express.Router();

router.route('/register').get(trimRequest.all,register);
router.route('/login').get(trimRequest.all,login);
router.route('/logout').get(trimRequest.all,logout);
router.route('/refresh-token').get(trimRequest.all,refreshToken);

export default router;