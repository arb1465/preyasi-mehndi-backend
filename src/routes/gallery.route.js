// back/src/routes/gallery.route.js
import { Router } from 'express';
import { getAllGalleryImages } from '../controllers/gallery.controller.js';

const router = Router();

// GET /gallery
router.route('/').get(getAllGalleryImages);

export default router;