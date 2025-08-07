import dotenv from 'dotenv';
import connectDB from './db.js';
import { app } from './app.js';

dotenv.config({
    path: './.env' // Explicitly tell dotenv where to find the .env file
});

const PORT = process.env.PORT || 5001;

// --- Connect to DB, then start the server ---
connectDB()
.then(() => {
    // This is a good place for an error handler for the app itself
    app.on("error", (error) => {
        console.error("Express app error:", error);
        throw error;
    });

    // Start listening for requests
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.error("Mongo DB connection failed! Server will not start.", err);
});