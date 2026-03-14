import express from 'express';
import { createPayment, getPayment, getPaymentByBooking, refundPayment, } from '../controllers/paymentController.js';
const router = express.Router();
// Create a new payment
router.post('/', createPayment);
// Get payment by ID
router.get('/:id', getPayment);
// Get payment by booking ID
router.get('/booking/:bookingId', getPaymentByBooking);
// Refund a payment
router.post('/:id/refund', refundPayment);
export default router;
//# sourceMappingURL=payments.js.map