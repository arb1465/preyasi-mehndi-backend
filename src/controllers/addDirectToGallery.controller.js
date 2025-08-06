import { GalleryImage } from "../models/galleryImage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const addDirectToGallery = asyncHandler(async (req, res) => {
    // We get the text fields from the request body
    const { category, altText } = req.body;
    
    // We check that a file was actually uploaded by multer
    if (!req.file) {
        throw new ApiError(400, "An image file is required.");
    }
    
    if (!category) {
        throw new ApiError(400, "A category ('hand' or 'feet') is required.");
    }

    // The path to the uploaded image file
    const imageUrl = req.file.path; 

    const newGalleryImage = await GalleryImage.create({
        category,
        altText,
        imageUrl // Now this will be the correct, full URL
    });

    if (!newGalleryImage) {
        throw new ApiError(500, "Failed to save the image to the gallery.");
    }

    return res.status(201).json(
        new ApiResponse(201, newGalleryImage, "Image uploaded to gallery successfully!")
    );
});

export { addDirectToGallery };