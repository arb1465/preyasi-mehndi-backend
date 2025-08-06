import { asyncHandler } from "../utils/asyncHandler.js";

const deleteReview = asyncHandler ( async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ error: 'Review not found.' });
        // We could also add logic here to delete the associated image file from the /uploads folder
        res.json({ message: 'Review deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error deleting review.' });
    }
})

export { deleteReview }