import { z } from 'zod';
export declare const createBookingSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    departureCity: z.ZodString;
    destinationCity: z.ZodString;
    departureDate: z.ZodEffects<z.ZodString, string, string>;
    departureTime: z.ZodString;
    passengers: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    departureTime: string;
    passengers: number;
}, {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    departureCity: string;
    destinationCity: string;
    departureDate: string;
    departureTime: string;
    passengers: number;
}>;
export declare const createPaymentSchema: z.ZodObject<{
    bookingId: z.ZodString;
    method: z.ZodEnum<["card", "paypal", "bank_transfer", "crypto"]>;
    amount: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    bookingId: string;
    method: "card" | "paypal" | "bank_transfer" | "crypto";
    amount: number;
}, {
    bookingId: string;
    method: "card" | "paypal" | "bank_transfer" | "crypto";
    amount: number;
}>;
export declare const contactMessageSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    subject: z.ZodString;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    message: string;
    name: string;
    subject: string;
    phone?: string | undefined;
}, {
    email: string;
    message: string;
    name: string;
    subject: string;
    phone?: string | undefined;
}>;
export declare const reviewSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    rating: z.ZodNumber;
    message: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    message: string;
    name: string;
    rating: number;
}, {
    email: string;
    message: string;
    name: string;
    rating: number;
}>;
export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type CreatePaymentInput = z.infer<typeof createPaymentSchema>;
export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
//# sourceMappingURL=validation.d.ts.map