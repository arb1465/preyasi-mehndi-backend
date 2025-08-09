import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import connectDB from './src/db.js';
import { app } from './src/app.js';

const PORT = process.env.PORT || 5001;

// Local development: start Express normally
if (process.env.NODE_ENV !== 'production') {
    connectDB()
        .then(() => {
            app.listen(PORT, () => {
                console.log(`🚀 Server running at http://localhost:${PORT}`);
            });
        })
        .catch((err) => {
            console.error("Mongo DB connection failed!", err);
        });
}

// Vercel: export serverless handler
export default async function handler(req, res) {
    await connectDB();
    return app(req, res);
}