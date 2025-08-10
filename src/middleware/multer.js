import multer from "multer";

// Store file in memory (buffer), no temp folder needed
const storage = multer.memoryStorage();

export const upload = multer({ storage });
