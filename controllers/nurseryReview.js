import asyncHandler from "express-async-handler";
import NurseryReview from "../models/nurseryReview.js";
import Nurseries from "../models/nurseries.js";
// @desc    Create new nursery review
// @route   POST /api/v1/nursery-reviews
// @access  Private
export const createNurseryReviewCtrl = asyncHandler(async (req, res) => {
    const {
        rating,
        nursery_id
    } = req.body;

    // Create nursery review
    const nurseryReview = await NurseryReview.create({
        user: req.userAuthId, // Assuming you have user authentication middleware
        rating,
        nursery_id,
    });

    // Update totalRating in the associated nursery
    const nursery = await Nurseries.findById(nursery_id);
    if (nursery) {
        nursery.totalRating += rating;
        await nursery.save();
    }

    res.status(201).json({
        success: true,
        message: "Nursery review created successfully",
    });
});

// @desc    Get all nursery reviews
// @route   GET /api/v1/nursery-reviews
// @access  Public
export const getAllNurseryReviewsCtrl = asyncHandler(async (req, res) => {
    const nurseryReviews = await NurseryReview.find();
    res.json({
        status: "success",
        message: "Nursery reviews fetched successfully",
        nurseryReviews,
    });
});

// @desc    Get single nursery review
// @route   GET /api/v1/nursery-reviews/:id
// @access  Public
export const getSingleNurseryReviewCtrl = asyncHandler(async (req, res) => {
    const nurseryReview = await NurseryReview.findById(req.params.id);
    res.json({
        status: "success",
        message: "Nursery review fetched successfully",
        nurseryReview,
    });
});

// @desc    Update nursery review
// @route   PUT /api/v1/nursery-reviews/:id
// @access  Private
export const updateNurseryReviewCtrl = asyncHandler(async (req, res) => {
    const {
        rating
    } = req.body;

    // Update
    const nurseryReview = await urseryReview.findByIdAndUpdate(
        req.params.id, {
            rating
        }, {
            new: true
        }
    );

    res.json({
        status: "success",
        message: "Nursery review updated successfully",
        nurseryReview,
    });
});

// @desc    Delete nursery review
// @route   DELETE /api/v1/nursery-reviews/:id
// @access  Private
export const deleteNurseryReviewCtrl = asyncHandler(async (req, res) => {
    await NurseryReview.findByIdAndDelete(req.params.id);

    res.json({
        status: "success",
        message: "Nursery review deleted successfully",
    });
});