import { Review } from "../models/addReview.js";
import { Booking } from "../models/booking.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getPendingReviewCount = asyncHandler(async (req, res) => {
    const count = await Review.countDocuments({ isApproved: false });
    res.status(200).json({ count });
});

const getBookingCount = asyncHandler(async (req, res) => {
    const count = await Booking.countDocuments();
    res.status(200).json({ count });
});

export { getPendingReviewCount, getBookingCount };