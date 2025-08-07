import { Router } from "express";
import { submitReview } from "../controllers/review.controller.js";
import { upload } from "../middleware/multer.js"
import { getApprovedReviews  } from "../controllers/getApprovedReviews.controller.js";

const router = Router()

router.route("/")
    .post(upload.single('photo'), 
        submitReview);

router.route("/")
    .get(getApprovedReviews);


export default router;