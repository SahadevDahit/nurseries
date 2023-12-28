import express from "express";
import {
    createPlantReviewCtrl,
    getAllPlantReviewsCtrl,
    getSinglePlantReviewCtrl,
    updatePlantReviewCtrl,
    deletePlantReviewCtrl,
} from "../controllers/plantReview.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();
router.post(
    "/",
    isLoggedIn,

    createPlantReviewCtrl
);
router.get("/", getAllPlantReviewsCtrl);
router.get("/:id", getSinglePlantReviewCtrl);
router.delete("/:id", deletePlantReviewCtrl);
router.put("/:id", updatePlantReviewCtrl);


export default router;