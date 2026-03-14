import { Request, Response } from 'express';
export declare const getAllCities: (req: Request, res: Response) => Promise<void>;
export declare const getCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const searchCities: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const addCity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=citiesController.d.ts.map