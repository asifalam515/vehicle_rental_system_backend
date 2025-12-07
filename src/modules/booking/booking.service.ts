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
// const getAllBookingsFromDB = async (role: string, customerId: string) => {
//   if (role === "admin") {
//     // show all
//     const result = await pool.query(`SELECT * FROM bookings`);

//     return result.rows;
//   } else {
//     // customer will only shown his own bookings
//     // we will search by email/customerId query
//     const result = await pool.query(
//       `SELECT * FROM bookings WHERE customer_id=$1`,
//       [customerId]
//     );
//     return result.rows;
//   }
// };
const getAllBookingsFromDB = async (role: string, customerId: string) => {
  let bookingsResult;

  if (role === "admin") {
    bookingsResult = await pool.query(
      `SELECT * FROM bookings ORDER BY id DESC`
    );
  } else {
    bookingsResult = await pool.query(
      `SELECT * FROM bookings WHERE customer_id = $1 ORDER BY id DESC`,
      [customerId]
    );
  }

  const bookings = bookingsResult.rows;
  const finalData = [];

  for (const booking of bookings) {
    //get user/ customer info
    const customerRes = await pool.query(
      `SELECT name, email FROM users WHERE id = $1`,
      [booking.customer_id]
    );

    //  vehicle info
    const vehicleRes = await pool.query(
      `SELECT vehicle_name, registration_number 
         FROM vehicles WHERE id = $1`,
      [booking.vehicle_id]
    );

    finalData.push({
      ...booking,
      customer: customerRes.rows[0] || null,
      vehicle: vehicleRes.rows[0] || null,
    });
  }

  return finalData;
};
const updateBookingInDB = async (
  bookingId: string,
  newStatus: string,
  role: string,
  customerId: string
) => {
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);
  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }
  const booking = bookingRes.rows[0];
  // role
  if (role === "customer") {
    if (booking.customer_id !== Number(customerId)) {
      throw new Error("You don't have access to update others");
    }
    if (newStatus !== "cancelled") {
      throw new Error("Customers can only cancel their bookings");
    }
  }
  if (role === "admin") {
    if (newStatus !== "returned" && newStatus !== "cancelled") {
      throw new Error("Invalid status for admin");
    }
  }
  const updateRes = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [newStatus, bookingId]
  );
  const updatedBooking = updateRes.rows[0];
  let vehicleUpdate = null;

  if (role === "admin" && newStatus === "returned") {
    vehicleUpdate = await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1 RETURNING availability_status`,
      [booking.vehicle_id]
    );
  }
  return {
    ...updatedBooking,
    vehicle: vehicleUpdate ? vehicleUpdate.rows[0] : undefined,
  };
};

export const bookingService = {
  createBookingToDB,
  getAllBookingsFromDB,
  updateBookingInDB,
};
