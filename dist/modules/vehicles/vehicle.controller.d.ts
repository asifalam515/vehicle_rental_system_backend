import { Request, Response } from "express";
export declare const vehicleController: {
    addVehicle: (req: Request, res: Response) => Promise<void>;
    getAllVehicles: (req: Request, res: Response) => Promise<void>;
    getSingleVehicle: (req: Request, res: Response) => Promise<void>;
    updateVehicleFromDB: (req: Request, res: Response) => Promise<void>;
    deleteVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=vehicle.controller.d.ts.map