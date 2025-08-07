import { Router } from "express";
import { submitBookingReq } from "../controllers/booking.controller.js";

const router = Router()

router.route("/submit-req")
    .post(
        submitBookingReq
    )

export default router;