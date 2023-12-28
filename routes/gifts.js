// Gift Routes (gift.js)

import express from "express";
import {
    createGiftCtrl,
    getAllGiftsCtrl,
    getSingleGiftCtrl,
    updateGiftCtrl,
    deleteGiftCtrl
} from "../controllers/gifts.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post(
    "/",
    isLoggedIn,
    createGiftCtrl
);
router.get("/", isLoggedIn, getAllGiftsCtrl);
router.get("/:id", getSingleGiftCtrl);
router.delete("/:id", isLoggedIn, deleteGiftCtrl);
router.put("/:id", isLoggedIn, updateGiftCtrl);

export default router;