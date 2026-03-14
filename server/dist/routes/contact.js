import express from 'express';
import { createContactMessage, getContactMessages, getContactMessage, replyToMessage, deleteMessage, } from '../controllers/contactController.js';
const router = express.Router();
// Create a new message
router.post('/', createContactMessage);
// Get all messages (with optional status filter)
router.get('/', getContactMessages);
// Get single message
router.get('/:id', getContactMessage);
// Reply to a message
router.post('/:id/reply', replyToMessage);
// Delete a message
router.delete('/:id', deleteMessage);
export default router;
//# sourceMappingURL=contact.js.map