import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const fileUpload = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload failed:", error);
          return reject(error);
        }
        console.log("File uploaded successfully:", result.secure_url);
        resolve(result);
      }
    );

    stream.end(fileBuffer);
  });
};

export default fileUpload;
