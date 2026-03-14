import express from 'express';
import { createBooking, getBooking, getBookingByNumber, getUserBookings, cancelBooking, } from '../controllers/bookingController.js';
const router = express.Router();
// Create a new booking
router.post('/', createBooking);
// Get booking by ID
router.get('/:id', getBooking);
// Get booking by booking number
router.get('/number/:bookingNumber', getBookingByNumber);
// Get all bookings for a user by email
router.get('/user/:email', getUserBookings);
// Cancel a booking
router.put('/:id/cancel', cancelBooking);
export default router;
//# sourceMappingURL=bookings.js.map