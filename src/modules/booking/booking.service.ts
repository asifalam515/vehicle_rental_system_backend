import { pool } from "./../../config/db";

const createBookingToDB = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
  const vehicleResult = await pool.query(
    `SELECT vehicle_name,daily_rent_price,availability_status FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );
  if (vehicleResult.rows.length === 0) {
    throw new Error("Vehicle not found");
  }
  const vehicle = vehicleResult.rows[0];
  if (vehicle.availability_status === "booked") {
    throw new Error("Vehicle already booked");
  }
  const dailyPrice = vehicle.daily_rent_price;
  const start = new Date(rent_start_date as string);
  const end = new Date(rent_end_date as string);
  const diffTime = end.getTime() - start.getTime();
  const days = Math.ceil(diffTime / (1000 * 3600 * 24));

  if (days <= 0) {
    throw new Error("Invalid booking dates");
  }
  const total_price = days * dailyPrice;
  const result = await pool.query(
    `INSERT INTO bookings (customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,customer_id,vehicle_id,rent_start_date,rent_end_date,total_price,status`,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      total_price,
      "active",
    ]
  );
  const booking = result.rows[0];
  // update status
  //   update vehicle status to booked
  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  const finalData = {
    ...booking,
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
  return finalData;
};
const getAllBookingsFromDB = async (role: string, customerId: string) => {
  if (role === "admin") {
    // show all
    const result = await pool.query(`SELECT * FROM bookings`);
    return result.rows;
  } else {
    // customer will only shown his own bookings
    // we will search by email/customerId query
    const result = await pool.query(
      `SELECT * FROM bookings WHERE customer_id=$1`,
      [customerId]
    );
    return result.rows;
  }
};

export const bookingService = { createBookingToDB, getAllBookingsFromDB };
