import mongoose from "mongoose";

const bookingSchema  = new mongoose.Schema({
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
        required: true,
        unique: true,
        index: true
    },
    phone: {
        type: Number,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    pincode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    bookingType: {
        type: String,
        required: true
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestemps: true
})

export const Booking = mongoose.model('Booking', bookingSchema);