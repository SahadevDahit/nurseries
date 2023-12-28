import express from "express";
import {
    createNurseryCtrl,
    getAllNurseriesCtrl,
    getSingleNurseryCtrl,
    updateNurseryCtrl,
    deleteNurseryCtrl,
} from "../controllers/nurseries.js";
import isAdmin from "../middlewares/isAdmin.js";

import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js"
const router = express.Router();


// Create a new nursery review
router.post("/", isLoggedIn, isAdmin, createNurseryCtrl);

// Get all nursery reviews
router.get("/", getAllNurseriesCtrl);

// Get a single nursery review by ID
router.get("/:id", getSingleNurseryCtrl);

// Update a nursery review by ID
router.put("/:id", isLoggedIn, isAdmin, updateNurseryCtrl);

// Delete a nursery review by ID
router.delete("/:id", isLoggedIn, isAdmin, deleteNurseryCtrl);

export default router;