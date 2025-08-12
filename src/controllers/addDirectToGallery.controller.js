import { GalleryImage } from "../models/galleryImage.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import fileUpload from "../utils/fileUpload.js";

const addDirectToGallery = asyncHandler(async (req, res) => {
  console.log("--- addDirectToGallery Controller ---");
  console.log("Request Body:", req.body);
  console.log("Uploaded File:", req.file);

  const { category, altText } = req.body;

  if (!req.file) {
    throw new ApiError(400, "An image file is required.");
  }

  if (!category) {
    throw new ApiError(400, "A category is required.");
  }

  const cloudinaryResponse = await fileUpload(req.file.buffer);

  if (!cloudinaryResponse?.secure_url) {
    throw new ApiError(500, "Error uploading image to Cloudinary.");
  }

  const newGalleryImage = await GalleryImage.create({
    category,
    altText,
    imageUrl: cloudinaryResponse.secure_url
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newGalleryImage, "Image uploaded to gallery successfully!"));
});

export { addDirectToGallery };