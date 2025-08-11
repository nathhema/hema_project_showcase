import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth';
export declare const getFarmStays: (req: Request, res: Response) => Promise<void>;
export declare const getFarmStayById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const createFarmStay: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateFarmStay: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteFarmStay: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getHostFarmStays: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=farmStayController.d.ts.map