// potController.js

import asyncHandler from "express-async-handler";
import Pot from "../models/pots.js";

// @desc    Create a new pot
// @route   POST /api/v1/pots
// @access  Private/Admin
export const createPotCtrl = asyncHandler(async (req, res) => {
    const {
        plant_id,
        name,
        price
    } = req.body;

    const pot = await Pot.create({
        plant_id,
        name,
        price
    });

    res.status(201).json({
        success: true,
        data: pot
    });
});

// @desc    Get all pots
// @route   GET /api/v1/pots
// @access  Public
export const getAllPotsCtrl = asyncHandler(async (req, res) => {
    const pots = await Pot.find();
    res.json({
        success: true,
        data: pots
    });
});

// @desc    Get a single pot by ID
// @route   GET /api/v1/pots/:id
// @access  Public
export const getSinglePotCtrl = asyncHandler(async (req, res) => {
    const pot = await Pot.findById(req.params.id);

    if (!pot) {
        res.status(404);
        throw new Error("Pot not found");
    }

    res.json({
        success: true,
        data: pot
    });
});

// @desc    Update a pot by ID
// @route   PUT /api/v1/pots/:id
// @access  Private/Admin
export const updatePotCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        price
    } = req.body;

    const pot = await Pot.findByIdAndUpdate(
        req.params.id, {
            name,
            price
        }, {
            new: true
        }
    );

    if (!pot) {
        res.status(404);
        throw new Error("Pot not found");
    }

    res.json({
        success: true,
        data: pot
    });
});

// @desc    Delete a pot by ID
// @route   DELETE /api/v1/pots/:id
// @access  Private/Admin
// @desc    Delete a pot by ID
// @route   DELETE /api/v1/pots/:id
// @access  Private/Admin
export const deletePotCtrl = asyncHandler(async (req, res) => {
    const pot = await Pot.findByIdAndDelete(req.params.id);

    if (!pot) {
        res.status(404);
        throw new Error("Pot not found");
    }

    res.json({
        success: true,
        message: "Pot deleted successfully"
    });
});