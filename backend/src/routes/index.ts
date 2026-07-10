import { Router } from 'express';
import statusRouter from './status';
import aiRouter from './ai';

const mainRouter = Router();

// Mount status health routes
mainRouter.use('/status', statusRouter);

// Mount structured AI architecture endpoints
mainRouter.use('/ai', aiRouter);

export default mainRouter;
