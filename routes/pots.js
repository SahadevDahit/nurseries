// potRoutes.js

import express from "express";
import {
    createPotCtrl,
    getAllPotsCtrl,
    getSinglePotCtrl,
    updatePotCtrl,
    deletePotCtrl,
} from "../controllers/pots.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();

// POST: Create a new pot
router.post("/", isLoggedIn, createPotCtrl);

// GET: Get all pots
router.get("/", getAllPotsCtrl);

// GET: Get a single pot by ID
router.get("/:id", getSinglePotCtrl);

// PUT: Update a pot by ID
router.put("/:id", isLoggedIn, updatePotCtrl);

// DELETE: Delete a pot by ID
router.delete("/:id", isLoggedIn, deletePotCtrl);

export default router;