// back/src/controllers/ai.controller.js

import axios from 'axios';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

const generateMehendiImage = asyncHandler(async (req, res) => {
    const prompt = "A beautiful intricate black and white mehendi mandala, clean white background, detailed linework, high resolution, 4k, professional henna artwork";
    const negative_prompt = "low quality, deformed, disfigured, text";

    console.log("Starting AI image generation with Hugging Face...");

    try {
        const response = await axios.post(
            API_URL,
            { 
                inputs: prompt,
                parameters: { negative_prompt } // Adding negative prompt for better quality
            },
            {
                headers: { 'Authorization': `Bearer ${HUGGINGFACE_API_TOKEN}`, 'Content-Type': 'application/json', 'Accept': 'image/jpeg' },
                responseType: 'arraybuffer' 
                
            }
        );
        
        const imageBuffer = Buffer.from(response.data, 'binary');
        const base64Image = imageBuffer.toString('base64');
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;

        console.log("AI image generated successfully from Hugging Face!");

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200, 
                    { imageUrl }, 
                    "Image generated successfully."
                )
            );

    }
    catch (error) {
        if (error.response && error.response.data) {
            // Convert the error data (which might be binary) to a string
            const errorString = Buffer.from(error.response.data).toString();

            try {
                const errorData = JSON.parse(errorString);
                if (errorData.error && errorData.error.includes("is currently loading")) {
                     throw new ApiError(503, `AI model is starting up. Please try again in about ${errorData.estimated_time || 20} seconds.`);
                }
                throw new ApiError(500, errorData.error || "An unknown error occurred with the AI service.");
            } 
            catch (jsonParseError) {                
                // We'll just throw a generic error with the text we received.
                throw new ApiError(error.response.status || 500, `AI service responded with an error: ${errorString}`);
            }
        }
        
        // Handle network errors where there's no response from the server
        console.error("Hugging Face API Error:", error.message);
        throw new ApiError(500, "Could not connect to the AI service.");
    }
});

export { generateMehendiImage };