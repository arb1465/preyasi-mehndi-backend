import mongoose from "mongoose";

const galleryImageSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true,
            // 'enum' is a validator that ensures the category can ONLY be one of these two values.
            // This prevents data entry errors.
            enum: ['all','hand', 'feet'] 
        },

        imageUrl: {
            type: String,
            required: true
        },

        altText: {
            type: String,
            default: 'Preyasi Mehendi Design' 
        }
    },
    {
        timestamps: true 
    }
);

export const GalleryImage = mongoose.model("GalleryImage", galleryImageSchema)