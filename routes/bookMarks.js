import express from "express";
import {
    createBookmarkCtrl,
    getAllBookmarksCtrl,
    getSingleBookmarkCtrl,
    deleteBookmarkCtrl,
    updateBookmarkCtrl
} from "../controllers/bookmarks.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post(
    "/",
    isLoggedIn,

    createBookmarkCtrl
);
router.get("/", isLoggedIn, getAllBookmarksCtrl);
router.get("/:id", getSingleBookmarkCtrl);
router.delete("/:id", isLoggedIn, deleteBookmarkCtrl);
router.put("/:id", isLoggedIn, updateBookmarkCtrl);

export default router;