import { Request, Response } from 'express';
export declare const createReview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getApprovedReviews: (req: Request, res: Response) => Promise<void>;
export declare const getAllReviews: (req: Request, res: Response) => Promise<void>;
export declare const approveReview: (req: Request, res: Response) => Promise<void>;
export declare const deleteReview: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=reviewController.d.ts.map