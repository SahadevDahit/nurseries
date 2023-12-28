import asyncHandler from "express-async-handler";
import PlantReview from "../models/plantsReview.js";

// @desc    Create new plant review
// @route   POST /api/v1/plant-reviews
// @access  Private/User
export const createPlantReviewCtrl = asyncHandler(async (req, res) => {
    const {

        rating,
        plant_id
    } = req.body;

    // Validation or other custom logic if needed

    // Create plant review
    const plantReview = await PlantReview.create({
        user: req.userAuthId,
        rating,
        plant_id,
    });

    res.status(201).json({
        success: true,
        message: "Plant review created successfully",
        plantReview,
    });
});
// @desc    Get all plant reviews
// @route   GET /api/v1/plant-reviews
// @access  Public
export const getAllPlantReviewsCtrl = asyncHandler(async (req, res) => {
    const plantReviews = await PlantReview.find().populate('user').populate('plant_id');

    res.json({
        success: true,
        message: "Plant reviews fetched successfully",
        plantReviews,
    });
});


// @desc    Get single plant review by ID
// @route   GET /api/v1/plant-reviews/:id
// @access  Public
export const getSinglePlantReviewCtrl = asyncHandler(async (req, res) => {
    const plantReview = await PlantReview.findById(req.params.id);
    res.json({
        success: true,
        message: "Plant review fetched successfully",
        plantReview,
    });
});

// @desc    Update plant review by ID
// @route   PUT /api/v1/plant-reviews/:id
// @access  Private/User
export const updatePlantReviewCtrl = asyncHandler(async (req, res) => {
    const {
        rating
    } = req.body;

    // Update plant review
    const plantReview = await PlantReview.findByIdAndUpdate(
        req.params.id, {
            rating
        }, {
            new: true
        }
    );

    res.json({
        success: true,
        message: "Plant review updated successfully",
        plantReview,
    });
});

// @desc    Delete plant review by ID
// @route   DELETE /api/v1/plant-reviews/:id
// @access  Private/User
export const deletePlantReviewCtrl = asyncHandler(async (req, res) => {
    await PlantReview.findByIdAndDelete(req.params.id);
    res.json({
        success: true,
        message: "Plant review deleted successfully",
    });
});