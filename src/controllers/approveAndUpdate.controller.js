import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/addReview.js"

const approveAndUpdateReview = asyncHandler( async (req, res) => {
    try {
        // This is the data the admin will send from the frontend
        const { addToGallery, category, altText } = req.body;

        // First, find the review we want to approve
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ error: 'Review not found.' });
        }

        // --- Logic to Add to Gallery ---
        // Check if the admin wants to add it AND if a photo actually exists
        if (addToGallery && review.photoUrl) {
            // Check if this image already exists in the gallery to avoid duplicates
            const imageExists = await GalleryImage.findOne({ imageUrl: review.photoUrl });

            if (!imageExists) {
                const newGalleryImage = new GalleryImage({
                    imageUrl: review.photoUrl,
                    category: category, // This comes from the admin's prompt
                    altText: altText
                });
                await newGalleryImage.save();
            }
        }
        
        // --- Finally, approve the review itself ---
        review.isApproved = true;
        await review.save();

        res.json({ message: 'Review approved successfully.' });

    } catch (error) {
        console.error("Error approving review:", error);
        res.status(500).json({ error: 'Server error approving review.' });
    }
})

export { approveAndUpdateReview }