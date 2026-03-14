import { Request, Response } from 'express';
export declare const createContactMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getContactMessages: (req: Request, res: Response) => Promise<void>;
export declare const getContactMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const replyToMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteMessage: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=contactController.d.ts.map