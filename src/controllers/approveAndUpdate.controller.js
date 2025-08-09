import { asyncHandler } from "../utils/asyncHandler.js";
import { Review } from "../models/addReview.js"
import { GalleryImage } from "../models/galleryImage.js";

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
        if (addToGallery && review.photo) {
            
            const imageExists = await GalleryImage.findOne({ imageUrl: review.imageUrl });

            if (!imageExists) {
                const newGalleryImage = new GalleryImage({
                    imageUrl: review.imageUrl,
                    category: category || 'all',
                    altText: altText || `Review photo from ${review.firstName}`
                });
                await newGalleryImage.save();
            }
        }
        
        // --- Finally, approve the review itself ---
        review.isApproved = true;
        await review.save();

        res.json({ message: 'Review approved successfully.' });

    } 
    catch (error) {
        console.error("Error approving review:", error);
        res.status(500).json({ error: 'Server error approving review.' });
    }
})

export { approveAndUpdateReview }