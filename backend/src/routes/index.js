import express from 'express';
import authRouter from './auth.router.js';
import conversationRouter from './conversation.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/conversation', conversationRouter);

export default router;