import { Router } from 'express';
import statusRouter from './status';
import { aiService } from '../services/aiService';

const mainRouter = Router();

// Mount status health routes
mainRouter.use('/status', statusRouter);

// AI Sandbox Endpoint for future Gemini queries
mainRouter.post('/ai/chat', async (req, res, next) => {
  try {
    const { message, context } = req.body;
    if (!message) {
      res.status(400).json({ success: false, message: 'Message is required' });
      return;
    }
    const response = await aiService.generateResponse(message, context);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

export default mainRouter;
