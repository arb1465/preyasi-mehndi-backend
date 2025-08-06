import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { Review } from "../models/addReview.js"
import fileUpload from "../utils/fileUpload.js"

const submitReview = asyncHandler( async (req, res) => {
    const { firstName, lastName, email, phone, city, reviewText } = req.body
    
    
    if ([firstName, lastName, phone, city, reviewText].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All text fields are required");
    }
    
    const photoLocalPath = req.file?.path
    let photoUrl = "";
    console.log(req.file)
    
    if (photoLocalPath) {
        const photo = await fileUpload(photoLocalPath)

        if (!photo) {
            throw new ApiError(500, "Error uploading photo");
        }

        photoUrl = photo.url;
    }

    const review = await Review.create({
        firstName,
        lastName,
        email,
        city,
        phone,
        reviewText,
        photo: photoUrl || ""
    })

    if (!review) {
        throw new ApiError(500, "Failed to submit review");
    }

    return res
    .status(201)
    .json(
        new ApiResponse(200, review, "Review submitted")
    )
})

export {submitReview}