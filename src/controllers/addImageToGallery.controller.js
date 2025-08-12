import { GalleryImage } from "../models/galleryImage.js"; // Use your GalleryImage model
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const addImageToGallery = asyncHandler(async (req, res) => {
    // We expect the admin to send the imageUrl, category, and altText from the dashboard
    const { imageUrl, category, altText } = req.body;

    // --- Validation ---
    if (!imageUrl || !category) {
        throw new ApiError(400, "Image URL and category are required.");
    }

    // --- Create the new gallery image document ---
    const newGalleryImage = await GalleryImage.create({
        imageUrl,
        category,
        altText, // This can be optional if you have a default in your model
        isOnGallery: true
    });

    if (!newGalleryImage) {
        throw new ApiError(500, "Failed to add the image to the gallery.");
    }

    // --- Send a success response ---
    return res.status(201).json(
        new ApiResponse(201, newGalleryImage, "Image added to gallery successfully!")
    );
});

export { addImageToGallery };