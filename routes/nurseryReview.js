import express from "express";
import {
    createNurseryReviewCtrl,
    getAllNurseryReviewsCtrl,
    getSingleNurseryReviewCtrl,
    updateNurseryReviewCtrl,
    deleteNurseryReviewCtrl,
} from "../controllers/nurseryReview.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";
const router = express.Router();

router.post(
    "/",
    isLoggedIn,

    createNurseryReviewCtrl
);
router.get("/", getAllNurseryReviewsCtrl);
router.get("/:id", getSingleNurseryReviewCtrl);
router.delete("/:id", isLoggedIn, deleteNurseryReviewCtrl);
router.put("/:id", isLoggedIn, updateNurseryReviewCtrl);

export default router;