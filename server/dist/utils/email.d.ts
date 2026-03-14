export declare const sendBookingConfirmation: (email: string, bookingNumber: string, departure: string, destination: string, date: string, price: number) => Promise<void>;
export declare const sendContactReply: (email: string, name: string, subject: string, reply: string) => Promise<void>;
export declare const sendPaymentReceipt: (email: string, bookingNumber: string, amount: number, transactionId: string) => Promise<void>;
//# sourceMappingURL=email.d.ts.map