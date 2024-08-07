import express from 'express';
import authRouter from './auth.router.js';
import conversationRouter from './conversation.router.js';
import messageRouter from './message.router.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/conversation', conversationRouter);
router.use('/message', messageRouter);

export default router;