import express from 'express';
import {
  createBooking,
  getUserBookings,
  getHostBookings,
  getBookingById,
  updateBookingStatus
} from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// All booking routes require authentication
router.use(authenticate);

// Traveler routes
router.post('/', createBooking);
router.get('/my-bookings', getUserBookings);

// Host routes
router.get('/host-bookings', authorize('host', 'admin'), getHostBookings);

// Shared routes
router.get('/:id', getBookingById);
router.put('/:id/status', updateBookingStatus);

export default router;