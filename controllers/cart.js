// cartController.js

import asyncHandler from "express-async-handler";
import Cart from "../models/cart.js";

// @desc    Create new cart item
// @route   POST /api/v1/carts
// @access  Private
export const createCartCtrl = asyncHandler(async (req, res) => {
    const {
        plant_id,
        address,
        quantity
    } = req.body;

    // Create new cart item
    const cartItem = await Cart.create({
        user: req.userAuthId,
        plant_id,
        address,
        quantity
    });

    res.status(201).json({
        success: true,
        message: "Cart item created successfully",
        cartItem,
    });
});

// @desc    Get all cart items
// @route   GET /api/v1/carts
// @access  Private
export const getAllCartsCtrl = asyncHandler(async (req, res) => {
    const carts = await Cart.find({
        user: req.userAuthId
    });

    res.json({
        status: "success",
        message: "Cart items fetched successfully",
        carts,
    });
});

// @desc    Get single cart item
// @route   GET /api/v1/carts/:id
// @access  Private
export const getSingleCartCtrl = asyncHandler(async (req, res) => {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
        res.status(404).json({
            status: "error",
            message: "Cart item not found",
        });
    } else {
        res.json({
            status: "success",
            message: "Cart item fetched successfully",
            cartItem,
        });
    }
});

// @desc    Update cart item
// @route   PUT /api/v1/carts/:id
// @access  Private
export const updateCartCtrl = asyncHandler(async (req, res) => {
    const {
        plant_id,
        address,
        quantity
    } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
        req.params.id, {
            plant_id,
            address,
            quantity
        }, {
            new: true,
        }
    );

    if (!cartItem) {
        res.status(404).json({
            status: "error",
            message: "Cart item not found",
        });
    } else {
        res.json({
            status: "success",
            message: "Cart item updated successfully",
            cartItem,
        });
    }
});

// @desc    Delete cart item
// @route   DELETE /api/v1/carts/:id
// @access  Private
export const deleteCartCtrl = asyncHandler(async (req, res) => {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Cart item deleted successfully",
    });
});