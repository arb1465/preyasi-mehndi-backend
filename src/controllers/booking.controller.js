import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Booking } from "../models/booking.js"
import { sendBookingNotificationEmail } from "../utils/sendEmail.js"

const submitBookingReq = asyncHandler( async (req, res) => {
    const { firstName, lastName, address1, address2, pincode, email, phone, city, eventDate, bookingType } = req.body

    if ([firstName, lastName, phone, city, address1, eventDate, bookingType].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All text fields are required");
    }
    
    const newBooking = new Booking({
        firstName,
        lastName,
        phone,
        city,
        pincode,
        address1,
        eventDate,
        bookingType,
        email,
        address2
    });

    const savedBooking = await newBooking.save();

    await sendBookingNotificationEmail(savedBooking);

    return res
    .status(201)
    .json(
        new ApiResponse(200, newBooking, "Booking request submitted")
    )
})

export {submitBookingReq}