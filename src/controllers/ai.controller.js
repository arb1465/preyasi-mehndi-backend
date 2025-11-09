// back/src/controllers/ai.controller.js
import axios from "axios";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const HUGGINGFACE_API_TOKEN = process.env.HUGGINGFACE_API_TOKEN;

// ✅ new router endpoint
const API_URL = "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

export const generateMehendiImage = asyncHandler(async (req, res) => {
  const { prompt } = req.body;

  const positivePrompt =
    prompt ||
    "A detailed black and white mehendi mandala, clean white background, intricate linework, symmetrical henna pattern, 4K high resolution, elegant artistic design";
  const negative_prompt = "blurry, text, deformed, disfigured, low quality";

  try {
    console.log("🔄 Generating image via Hugging Face Router...");

    const response = await axios.post(
      API_URL,
      {
        inputs: positivePrompt,
        parameters: { negative_prompt },
      },
      {
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "image/jpeg",
        },
        responseType: "arraybuffer",
      }
    );

    const imageBuffer = Buffer.from(response.data, "binary");
    const base64Image = imageBuffer.toString("base64");
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log("✅ Image generated successfully!");
    res
      .status(200)
      .json(new ApiResponse(200, { imageUrl }, "Image generated successfully."));
  } catch (error) {
    console.error("❌ Hugging Face API Error:", error.message);
    if (error.response) {
      const errText = Buffer.from(error.response.data).toString();
      throw new ApiError(error.response.status, errText);
    }
    throw new ApiError(500, "Failed to connect to AI service.");
  }
});
