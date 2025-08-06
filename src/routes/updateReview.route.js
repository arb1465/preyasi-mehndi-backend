import { Router } from "express";
import { getApprovedReviews } from "../controllers/getApprovedReviews.controller.js";

const router = Router()

router.route("/")
    .get(getApprovedReviews);

export default router;