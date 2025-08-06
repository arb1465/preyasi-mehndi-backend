import mongoose from "mongoose";

const addReviewSchema  = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        index: true
    },
    phone: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    reviewText: {
        type: String
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestemps: true
})

export const Review = mongoose.model('Review', addReviewSchema);