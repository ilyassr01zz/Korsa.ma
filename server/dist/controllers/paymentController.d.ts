import { Request, Response } from 'express';
export declare const createPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPaymentByBooking: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const refundPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=paymentController.d.ts.map