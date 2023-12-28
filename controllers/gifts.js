// Gift Controller (gift.js)

import asyncHandler from "express-async-handler";
import Gift from "../models/gifts.js";

// @desc    Create a new gift
// @route   POST /api/v1/gifts
// @access  Private
export const createGiftCtrl = asyncHandler(async (req, res) => {
    const {
        type,
        nursery_id
    } = req.body;

    // Create gift
    const gift = await Gift.create({
        type,
        user: req.userAuthId,
        nursery_id,
    });

    res.status(201).json({
        success: true,
        message: "Gift created successfully",
        gift,
    });
});

// @desc    Get all gifts
// @route   GET /api/v1/gifts
// @access  Public
export const getAllGiftsCtrl = asyncHandler(async (req, res) => {
    // Retrieve the 'type' filter from the query parameters
    const typeFilter = req.query.type;

    // Use the 'typeFilter' in your query logic to filter gifts
    let query = {};
    if (typeFilter) {
        query.type = typeFilter;
    }

    // Example: Fetching gifts with or without type filter
    const gifts = await Gift.find(query);

    res.json({
        status: "success",
        message: "Gifts fetched successfully",
        gifts,
    });
});


// @desc    Get a single gift by ID
// @route   GET /api/v1/gifts/:id
// @access  Public
export const getSingleGiftCtrl = asyncHandler(async (req, res) => {
    const gift = await Gift.findById(req.params.id);
    res.json({
        status: "success",
        message: "Gift fetched successfully",
        gift,
    });
});

// @desc    Update a gift by ID
// @route   PUT /api/v1/gifts/:id
// @access  Private
export const updateGiftCtrl = asyncHandler(async (req, res) => {
    const {
        type
    } = req.body;

    // Update gift
    const gift = await Gift.findByIdAndUpdate(
        req.params.id, {
            type,
        }, {
            new: true,
        }
    );

    res.json({
        status: "success",
        message: "Gift updated successfully",
        gift,
    });
});

// @desc    Delete a gift by ID
// @route   DELETE /api/v1/gifts/:id
// @access  Private
export const deleteGiftCtrl = asyncHandler(async (req, res) => {
    await Gift.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Gift deleted successfully",
    });
});