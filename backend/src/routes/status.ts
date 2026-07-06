import { Router } from 'express';
import { getStatus } from '../controllers/statusController';

const router = Router();

router.get('/', getStatus);

export default router;
