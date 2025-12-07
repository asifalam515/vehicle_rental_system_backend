import { Request, Response } from "express";
export declare const userController: {
    getAllUsers: (req: Request, res: Response) => Promise<void>;
    updateUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
    deleteUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=user.controller.d.ts.map