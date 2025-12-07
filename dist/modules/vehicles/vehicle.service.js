"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleService = void 0;
const db_1 = require("../../config/db");
const addVehicleToDB = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(`INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING id,vehicle_name,type,registration_number,daily_rent_price,availability_status`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result;
};
const getAllVehiclesFromDB = async () => {
    const result = await db_1.pool.query(`  SELECT
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
     FROM vehicles`);
    return result;
};
const getSingleVehicleFromDB = async (vehicleId) => {
    const result = await db_1.pool.query(`  SELECT
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
     FROM vehicles WHERE id=$1`, [vehicleId]);
    return result;
};
// admin only
const updateVehicleFromDB = async (payload, vehicleId) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await db_1.pool.query(` UPDATE vehicles SET vehicle_name=$1,type=$2,registration_number=$3,daily_rent_price=$4,availability_status=$5 WHERE id=$6 RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
    ]);
    return result;
};
const deleteVehicleFromDB = async (vehicleId) => {
    const exists = await db_1.pool.query(`SELECT id  FROM vehicles WHERE id=$1`, [
        vehicleId,
    ]);
    if (exists.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    const activeBooking = await db_1.pool.query(`SELECT id FROM bookings WHERE  vehicle_id = $1 AND status = 'active'`, [vehicleId]);
    if (activeBooking.rows.length > 0) {
        throw new Error("Cannot delete vehicle with active bookings");
    }
    const result = await db_1.pool.query(`DELETE FROM vehicles WHERE id = $1`, [
        vehicleId,
    ]);
    return result;
};
exports.vehicleService = {
    addVehicleToDB,
    getAllVehiclesFromDB,
    getSingleVehicleFromDB,
    updateVehicleFromDB,
    deleteVehicleFromDB,
};
//# sourceMappingURL=vehicle.service.js.map