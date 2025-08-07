import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import reviewRoute from "./routes/review.route.js";
import bookingRoute from "./routes/booking.route.js";
import adminRoute from "./routes/admin.route.js";
import galleryRoute from "./routes/gallery.route.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(path.join(__dirname, '..', 'public'))); // Correctly points to back/public
app.use(cookieParser());


app.use('/reviews', reviewRoute);
app.use('/booking', bookingRoute);
app.use('/admin-ak47', adminRoute);
app.use('/gallery', galleryRoute);


app.get('/', (req, res) => {
    res.send('Preyasi Mehendi Backend is running!');
});


export { app };