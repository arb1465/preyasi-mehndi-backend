import { Booking } from "../models/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find().sort({ eventDate: 'asc' });

    return res.status(200).json(
        new ApiResponse(200, bookings, "All booking requests fetched successfully.")
    );
});

const deleteBooking = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the ID from the URL (e.g., /bookings/delete/someId)

    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
        throw new ApiError(404, "Booking request not found.");
    }

    return res.status(200).json(
        new ApiResponse(200, {}, "Booking request deleted successfully.")
    );
});

export { 
    getAllBookings, 
    deleteBooking 
};