import { GalleryImage } from '../models/galleryImage.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllGalleryImages = asyncHandler(async (req, res) => {
    const images = await GalleryImage.find({ isOnGallery: true }).sort({ createdAt: -1 });
    res.status(200).json(images);
});