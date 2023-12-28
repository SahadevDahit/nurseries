// controllers/orders.js

import asyncHandler from "express-async-handler";
import Order from "../models/orders.js";

// @desc    Create a new order
// @route   POST /api/v1/orders
// @access  Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
    const {
        plant_id,
        status,
        quantity,
        paymentStatus,
        paymentMethod,
        currency,
        delivery_fee,
        discount
    } = req.body;

    const order = await Order.create({
        user: req.userAuthId,
        plant_id,
        status,
        quantity,
        paymentStatus: paymentStatus || "pending",
        paymentMethod: paymentMethod || "Not specified",
        currency: currency || "inr",
        delivery_fee,
        discount
    });

    res.status(201).json({
        success: true,
        data: order,
    });
});

// @desc    Get all orders
// @route   GET /api/v1/orders
// @access  Private
export const getAllOrdersCtrl = asyncHandler(async (req, res) => {
    // Retrieve the 'type' filter from the query parameters
    const typeFilter = req.query.type;

    // Use the 'typeFilter' in your query logic to filter gifts
    let query = {
        user: req.userAuthId
    };
    if (typeFilter) {
        query.type = typeFilter;
    }

    if (typeFilter) {
        // Assuming 'type' is a field in your 'Order' model
        query.status = typeFilter;
    }

    // Example: Fetching orders with or without type filter
    const orders = await Order.find(query).populate("user").populate("plant_id");

    res.json({
        success: true,
        data: orders,
    });
});


// @desc    Get a single order by ID
// @route   GET /api/v1/orders/:id
// @access  Private
export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user").populate("plant_id");

    if (!order) {
        res.status(404).json({
            success: false,
            error: "Order not found",
        });
    } else {
        res.json({
            success: true,
            data: order,
        });
    }
});

// @desc    Update an order by ID
// @route   PUT /api/v1/orders/:id
// @access  Private
export const updateOrderCtrlAdmin = asyncHandler(async (req, res) => {
    const {
        plant_id,
        status,
        quantity,
        paymentStatus,
        paymentMethod,
        currency,
        delivery_fee,
        discount
    } = req.body;

    const order = await Order.findByIdAndUpdate(
        req.params.id, {
            plant_id,
            status,
            quantity,
            paymentStatus,
            paymentMethod,
            currency,
            delivery_fee,
            discount
        }, {
            new: true,
            runValidators: true,
        }
    );

    if (!order) {
        res.status(404).json({
            success: false,
            error: "Order not found",
        });
    } else {
        res.json({
            success: true,
            data: order,
        });
    }
});
// @desc    Delete an order by ID
// @route   DELETE /api/v1/orders/:id
// @access  Private
export const deleteOrderCtrl = asyncHandler(async (req, res) => {
    const orderId = req.params.id;

    // Find and delete the order by ID
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
        res.status(404).json({
            success: false,
            message: "Order not found",
        });
        return;
    }

    res.status(200).json({
        success: true,
        message: "Order deleted successfully",
        data: deletedOrder,
    });
});