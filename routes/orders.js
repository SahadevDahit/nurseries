// orderRoutes.js

import express from "express";
import {
    createOrderCtrl,
    getAllOrdersCtrl,
    getSingleOrderCtrl,
    updateOrderCtrlAdmin,
    deleteOrderCtrl,
} from "../controllers/orders.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router();

// POST: Create a new order
router.post("/", isLoggedIn, createOrderCtrl);

// GET: Get all orders
router.get("/", isLoggedIn, getAllOrdersCtrl);

// GET: Get a single order by ID
router.get("/:id", isLoggedIn, getSingleOrderCtrl);

// PUT: Update an order by ID
router.put("/:id", isLoggedIn, isAdmin, updateOrderCtrlAdmin);

// DELETE: Delete an order by ID
router.delete("/:id", isLoggedIn, isAdmin, deleteOrderCtrl);

export default router;