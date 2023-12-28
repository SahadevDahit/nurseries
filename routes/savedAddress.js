// savedAddressRoutes.js

import express from "express";
import {
    createSavedAddressCtrl,
    getAllSavedAddressesCtrl,
    getSingleSavedAddressCtrl,
    updateSavedAddressCtrl,
    deleteSavedAddressCtrl,
} from "../controllers/savedAddress.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const router = express.Router();

// POST: Create a new saved address
router.post("/", isLoggedIn, createSavedAddressCtrl);

// GET: Get all saved addresses
router.get("/", isLoggedIn, getAllSavedAddressesCtrl);

// GET: Get a single saved address by ID
router.get("/:id", isLoggedIn, getSingleSavedAddressCtrl);

// PUT: Update a saved address by ID
router.put("/:id", isLoggedIn, updateSavedAddressCtrl);

// DELETE: Delete a saved address by ID
router.delete("/:id", isLoggedIn, deleteSavedAddressCtrl);

export default router;