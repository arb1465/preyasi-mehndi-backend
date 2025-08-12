import { GalleryImage } from "../models/galleryImage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllImages = asyncHandler(async (req, res) => {
    const bookings = await GalleryImage.find().sort({ eventDate: 'asc' });

    return res.status(200).json(
        new ApiResponse(200, bookings, "All images fetched successfully.")
    );
});

const toggleGalleryStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const image = await GalleryImage.findById(id);

    if (!image) {
        throw new ApiError(404, "Image not found.");
    }

    image.isOnGallery = !image.isOnGallery;
    await image.save();

    const message = image.isOnGallery ? "Image added to public gallery." : "Image removed from public gallery.";
    
    return res.status(200).json(new ApiResponse(200, image, message));
});

export { getAllImages, toggleGalleryStatus }