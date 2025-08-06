import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/addReview.js";

const pendingReview = asyncHandler( async (req, res) => {
    try {
        const pendingReviews = await Review.find({ isApproved: false }).sort({ createdAt: -1 });
        res.json(pendingReviews);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error fetching pending reviews.' });
    }
})

export { pendingReview } 