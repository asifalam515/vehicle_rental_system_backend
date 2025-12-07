import { pool } from "../../config/db";

const addVehicleToDB = async (payload: Record<string, unknown>) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;
  const result = await pool.query(
    `INSERT INTO vehicles(vehicle_name, type, registration_number, daily_rent_price,availability_status) VALUES($1,$2,$3,$4,$5) RETURNING id,vehicle_name,type,registration_number,daily_rent_price,availability_status`,
    [
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status,
    ]
  );
  return result;
};

const getAllVehiclesFromDB = async () => {
  const result = await pool.query(`  SELECT
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
     FROM vehicles`);
  return result;
};
const getSingleVehicleFromDB = async (vehicleId: string) => {
  const result = await pool.query(
    `  SELECT
      id,
      vehicle_name,
      type,
      registration_number,
      daily_rent_price,
      availability_status
     FROM vehicles WHERE id=$1`,
    [vehicleId]
  );
  return result;
};

const updateVehicleFromDB = async (
  payload: Record<string, unknown>,
  vehicleId: string
) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = payload;

  const query = `
    UPDATE vehicles 
    SET 
      vehicle_name = $1,
      type = $2,
      registration_number = $3,
      daily_rent_price = $4,
      availability_status = $5
    WHERE id = $6
    RETURNING *;
  `;

  const result = await pool.query(query, [
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
    vehicleId,
  ]);

  return result.rows[0];
};

const deleteVehicleFromDB = async (vehicleId: string) => {
  const exists = await pool.query(`SELECT id  FROM vehicles WHERE id=$1`, [
    vehicleId,
  ]);
  if (exists.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  const activeBooking = await pool.query(
    `SELECT id FROM bookings WHERE  vehicle_id = $1 AND status = 'active'`,
    [vehicleId]
  );
  if (activeBooking.rows.length > 0) {
    throw new Error("Cannot delete vehicle with active bookings");
  }
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [
    vehicleId,
  ]);
  return result;
};
export const vehicleService = {
  addVehicleToDB,
  getAllVehiclesFromDB,
  getSingleVehicleFromDB,
  updateVehicleFromDB,
  deleteVehicleFromDB,
};
