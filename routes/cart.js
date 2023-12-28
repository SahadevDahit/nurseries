// cartRoutes.js

import express from "express";
import {
    createCartCtrl,
    getAllCartsCtrl,
    getSingleCartCtrl,
    updateCartCtrl,
    deleteCartCtrl,
} from "../controllers/cart.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();

router.post(
    "/",
    isLoggedIn,
    createCartCtrl
);
router.get("/", isLoggedIn, getAllCartsCtrl);
router.get("/:id", getSingleCartCtrl);
router.delete("/:id", isLoggedIn, deleteCartCtrl);
router.put("/:id", isLoggedIn, updateCartCtrl);

export default router;