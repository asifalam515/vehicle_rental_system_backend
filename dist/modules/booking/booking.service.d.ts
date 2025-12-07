export declare const bookingService: {
    createBookingToDB: (payload: Record<string, unknown>) => Promise<any>;
    getAllBookingsFromDB: (role: string, customerId: string) => Promise<any[]>;
    updateBookingInDB: (bookingId: string, newStatus: string, role: string, customerId: string) => Promise<any>;
};
//# sourceMappingURL=booking.service.d.ts.map