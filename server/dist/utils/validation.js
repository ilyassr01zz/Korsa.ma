import { z } from 'zod';
export const createBookingSchema = z.object({
    firstName: z.string().min(2, 'First name is required'),
    lastName: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Valid phone number required'),
    departureCity: z.string().min(2, 'Departure city required'),
    destinationCity: z.string().min(2, 'Destination city required'),
    departureDate: z.string().refine(date => new Date(date) > new Date(), 'Date must be in the future'),
    departureTime: z.string().regex(/^\d{2}:\d{2}$/, 'Invalid time format (HH:mm)'),
    passengers: z.number().int().min(1).max(6, 'Passengers must be 1-6'),
});
export const createPaymentSchema = z.object({
    bookingId: z.string().cuid('Invalid booking ID'),
    method: z.enum(['card', 'paypal', 'bank_transfer', 'crypto']),
    amount: z.number().positive('Amount must be positive'),
});
export const contactMessageSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().optional(),
    subject: z.string().min(3, 'Subject is required'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});
export const reviewSchema = z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    rating: z.number().int().min(1).max(5, 'Rating must be 1-5'),
    message: z.string().min(10, 'Message must be at least 10 characters'),
});
//# sourceMappingURL=validation.js.map