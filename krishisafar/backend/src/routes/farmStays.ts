import express from 'express';
import {
  getFarmStays,
  getFarmStayById,
  createFarmStay,
  updateFarmStay,
  deleteFarmStay,
  getHostFarmStays
} from '../controllers/farmStayController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/', getFarmStays);
router.get('/:id', getFarmStayById);

// Protected routes
router.post('/', authenticate, authorize('host', 'admin'), createFarmStay);
router.put('/:id', authenticate, authorize('host', 'admin'), updateFarmStay);
router.delete('/:id', authenticate, authorize('host', 'admin'), deleteFarmStay);

// Host-specific routes
router.get('/host/my-farmstays', authenticate, authorize('host', 'admin'), getHostFarmStays);

export default router;