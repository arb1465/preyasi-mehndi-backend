import express from 'express'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Router } from "express";

import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); // This loads our .env file
import { DB_NAME } from './constants.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: process.env.CORS_ORIGIN, // This should be 'http://localhost:3000' from your .env
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
// This teaches Express where to find static files like your uploaded images.
app.use(express.static('public'));
app.use(cookieParser());



import reviewRoute from "./routes/review.route.js"
import bookingRoute from "./routes/booking.route.js"
import adminRoute from "./routes/admin.route.js"
import forReviewsOnly from "./routes/updateReview.route.js"

app.use('/add-review', reviewRoute)
app.use('/booking', bookingRoute)
app.use('/admin-ak47', adminRoute)
app.use('/', forReviewsOnly)



const router = Router()

router.route('/').get(async (req, res) => { // Assuming this is in a review router mounted at /reviews
    try {
        const approvedReviews = await Review.find({ isApproved: true }).sort({ submittedAt: -1 });
        
        res.status(200).json(approvedReviews);

    } 
    catch (error) {
        console.error("Error fetching approved reviews:", error);
        
        res.status(500).json({ error: 'Server error while fetching reviews.' });
    }
});





// DB connection



// We will define our API endpoints here later.

app.get('/', (req, res) => {
    res.send('Preyasi Mehendi Backend is running!');
});

// const startServer = async () => {
//     await connectDB();
    
//     app.listen(PORT, () => {
//         console.log(`Server is running on http://localhost:${PORT}`);
//     });
// };





import { Review } from './models/addReview.js';
import { Booking } from './models/booking.js';
import { GalleryImage } from './models/galleryImage.js';
import { upload } from './middleware/multer.js';


app.get('/reviews/pending/count', async (req, res) => {
    try {
        const count = await Review.countDocuments({ isApproved: false });
        res.json({ count });
    } 
    catch (error) {
        res.status(500).json({ error: 'Error fetching pending review count.' });
    }
});

app.get('/bookings/count', async (req, res) => {
    try {
        const count = await Booking.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching booking count.' });
    }
});

app.post('/reviews', upload.single('photo'), async (req, res) => {
    try {
        const { firstName, lastName, email, city, reviewText } = req.body;

        // Build the review data object
        const reviewData = {
            firstName,
            lastName,
            email,
            city,
            reviewText
        };

        // If a file was uploaded, add its path to our data object
        if (req.file) {
            reviewData.photoUrl = `/uploads/${req.file.filename}`;
        }

        const newReview = new Review(reviewData);
        await newReview.save();

        res.status(201).json({ message: 'Review submitted successfully! It will appear after approval.' });

    } catch (error) {
        console.error("Error submitting review:", error);
        res.status(500).json({ error: 'Server error while submitting review.' });
    }
});



app.get('/gallery', async (req, res) => {
    try {
        // Find all documents and sort by newest first
        const images = await GalleryImage.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } 
    catch (error) {
        res.status(500).json({ error: 'Server error while fetching gallery images.' });
    }
});


// startServer();



const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log('MongoDB connected successfully!');
    } 
    catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

connectDB();