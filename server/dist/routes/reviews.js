import express from 'express';
import { createReview, getApprovedReviews, getAllReviews, approveReview, deleteReview, } from '../controllers/reviewController.js';
const router = express.Router();
// Create a new review
router.post('/', createReview);
// Get approved reviews (public)
router.get('/approved', getApprovedReviews);
// Get all reviews (admin only in production)
router.get('/', getAllReviews);
// Approve a review
router.post('/:id/approve', approveReview);
// Delete a review
router.delete('/:id', deleteReview);
export default router;
//# sourceMappingURL=reviews.js.map