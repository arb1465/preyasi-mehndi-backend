import { Router } from "express";
import { loginAdmin } from "../controllers/login.controller.js";
import { pendingReview } from "../controllers/pendingReview.controller.js";
import { approveAndUpdateReview } from "../controllers/approveAndUpdate.controller.js";
import { deleteReview } from "../controllers/deleteReview.controller.js";
import { addImageToGallery } from "../controllers/addImageToGallery.controller.js";
import { getAllBookings, deleteBooking } from "../controllers/manageBooking.controller.js";
import { addDirectToGallery } from "../controllers/addDirectToGallery.controller.js";
import { getPendingReviewCount, getBookingCount } from "../controllers/dashboard.controller.js";
import { getAllImages , toggleGalleryStatus} from "../controllers/manageGallery.controller.js"

import authMiddleware from "../middleware/auth.js"
import { upload } from "../middleware/multer.js";

const router = Router()

router.route("/login")
    .post(loginAdmin)

router.use(authMiddleware);

router.route('/manage-reviews/pending')
    .get(pendingReview);

router.route('/manage-reviews/approve/:id')
    .patch(approveAndUpdateReview);

router.route('/manage-reviews/:id')
    .delete(deleteReview);

router.route("/gallery/add")
    .post(authMiddleware, addImageToGallery);
router.route("/gallery/upload")
    .post(
        authMiddleware, 
        upload.single('galleryImage'),
        addDirectToGallery
    );

router.route("/bookings")
    .get(authMiddleware, getAllBookings);
router.route("/bookings/delete/:id")
    .delete(authMiddleware, deleteBooking);

router.route("/reviews/pending/count")
    .get(authMiddleware, getPendingReviewCount);
router.route("/bookings/count")
    .get(authMiddleware, getBookingCount);

router.route("/gallery/all")
    .get(authMiddleware, getAllImages);
router.route("/gallery/toggle/:id")
    .patch(authMiddleware, toggleGalleryStatus);


export default router;