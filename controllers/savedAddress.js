// savedAddressController.js

import asyncHandler from "express-async-handler";
import SavedAddress from "../models/savedAddress.js";

// @desc    Create a new saved address
// @route   POST /api/v1/savedAddresses
// @access  Private
export const createSavedAddressCtrl = asyncHandler(async (req, res) => {
    const {
        receiver_name,
        receiver_contact,
        streetAddress,
        apartment,
        city,
        country,
        zipcode
    } = req.body;

    const savedAddress = await SavedAddress.create({
        user: req.userAuthId,
        receiver_name,
        receiver_contact,
        streetAddress,
        apartment,
        city,
        country,
        zipcode
    });

    res.status(201).json({
        success: true,
        message: "Saved address created successfully",
        savedAddress,
    });
});

// @desc    Get all saved addresses
// @route   GET /api/v1/savedAddresses
// @access  Private
export const getAllSavedAddressesCtrl = asyncHandler(async (req, res) => {
    const savedAddresses = await SavedAddress.find({
        user: req.userAuthId
    });

    res.json({
        success: true,
        message: "Saved addresses fetched successfully",
        savedAddresses,
    });
});

// @desc    Get a single saved address by ID
// @route   GET /api/v1/savedAddresses/:id
// @access  Private
export const getSingleSavedAddressCtrl = asyncHandler(async (req, res) => {
    const savedAddress = await SavedAddress.findById(req.params.id);

    if (!savedAddress) {
        res.status(404);
        throw new Error("Saved address not found");
    }

    res.json({
        success: true,
        message: "Saved address fetched successfully",
        savedAddress,
    });
});

// @desc    Update a saved address by ID
// @route   PUT /api/v1/savedAddresses/:id
// @access  Private
export const updateSavedAddressCtrl = asyncHandler(async (req, res) => {
    const {
        receiver_name,
        receiver_contact,
        streetAddress,
        apartment,
        city,
        country,
        zipcode
    } = req.body;

    const savedAddress = await SavedAddress.findByIdAndUpdate(
        req.params.id, {
            receiver_name,
            receiver_contact,
            streetAddress,
            apartment,
            city,
            country,
            zipcode
        }, {
            new: true,
        }
    );

    if (!savedAddress) {
        res.status(404);
        throw new Error("Saved address not found");
    }

    res.json({
        success: true,
        message: "Saved address updated successfully",
        savedAddress,
    });
});

// @desc    Delete a saved address by ID
// @route   DELETE /api/v1/savedAddresses/:id
// @access  Private
export const deleteSavedAddressCtrl = asyncHandler(async (req, res) => {
    const savedAddress = await SavedAddress.findByIdAndDelete(req.params.id);

    if (!savedAddress) {
        res.status(404);
        throw new Error("Saved address not found");
    }

    res.json({
        success: true,
        message: "Saved address deleted successfully",
    });
});