export declare const vehicleService: {
    addVehicleToDB: (payload: Record<string, unknown>) => Promise<import("pg").QueryResult<any>>;
    getAllVehiclesFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleVehicleFromDB: (vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    updateVehicleFromDB: (payload: Record<string, unknown>, vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    deleteVehicleFromDB: (vehicleId: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=vehicle.service.d.ts.map