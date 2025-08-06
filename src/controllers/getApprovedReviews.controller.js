
import { Review } from "../models/addReview.js"; // Use your Review model
import { asyncHandler } from "../utils/asyncHandler.js";

const getApprovedReviews = asyncHandler(async (req, res) => {
    // This finds all documents in the Review collection where isApproved is true
    const reviews = await Review.find({ isApproved: true }).sort({ createdAt: -1 });

    // It sends the found reviews back as a JSON response
    return res.status(200).json(reviews);
});

export { getApprovedReviews };