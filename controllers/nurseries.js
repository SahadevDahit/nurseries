import asyncHandler from "express-async-handler";
import Nurseries from "../models/nurseries.js";
import NurseryReview from "../models/nurseryReview.js";
// @desc    Create new nursery
// @route   POST /api/v1/nurseries
// @access  Private/Admin
export const createNurseryCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        time,
        distance,
        address
    } = req.body;

    // Create nursery
    const nursery = await Nurseries.create({
        name,
        time,
        distance,
        address,
        user: req.userAuthId,
    });

    res.status(201).json({
        success: true,
        message: "Nursery created successfully",
        nursery,
    });
});

// @desc    Get all nurseries
// @route   GET /api/v1/nurseries
// @access  Public
export const getAllNurseriesCtrl = asyncHandler(async (req, res) => {
    let query = {};

    // Filter by name (case-insensitive)
    if (req.query.name) {
        query.name = {
            $regex: req.query.name,
            $options: "i"
        };
    }

    if (req.query.distance) {
        query.distance = {
            $regex: req.query.distance,
            $options: "i"
        };
    }
    if (req.query.time) {
        query.time = {
            $regex: req.query.time,
            $options: "i"
        };
    }

    // Filter by address
    if (req.query.address) {
        query.address = {
            $regex: req.query.address,
            $options: "i"
        };
    }

    const nurseries = await Nurseries.find(query);

    res.json({
        status: "success",
        message: "Nurseries fetched successfully",
        nurseries,
    });
});

// @desc    Get single nursery with average rating
// @route   GET /api/v1/nurseries/:id
// @access  Public
export const getSingleNurseryCtrl = asyncHandler(async (req, res) => {
    // Find all reviews for the nursery
    const nurseryReviews = await NurseryReview.find({
        nursery_id: req.params.id
    });

    // Find the nursery
    const nursery = await Nurseries.findById(req.params.id);

    if (!nursery) {
        res.status(404).json({
            status: "error",
            message: "Nursery not found",
        });
        return;
    }

    // Calculate average rating
    let ratingsTotal = 0;
    const reviewCount = nurseryReviews.length;

    if (reviewCount > 0) {
        // Calculate total ratings
        ratingsTotal = nurseryReviews.reduce((total, review) => total + review.rating, 0);

        // Calculate average rating
        const averageRating = Number(ratingsTotal / reviewCount).toFixed(1);

        res.json({
            status: "success",
            message: "Nursery fetched successfully",
            nursery: {
                ...nursery.toJSON(),
                averageRating,
                reviewCount,
            },
        });
    } else {
        res.json({
            status: "success",
            message: "Nursery fetched successfully",
            nursery: {
                ...nursery.toJSON(),
                averageRating: 0,
                reviewCount: 0,
            },
        });
    }
});


// @desc    Update nursery
// @route   PUT /api/v1/nurseries/:id
// @access  Private/Admin
export const updateNurseryCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        time,
        distance,
        address
    } = req.body;

    // Update
    const nursery = await Nurseries.findByIdAndUpdate(
        req.params.id, {
            name,
            time,
            distance,
            address
        }, {
            new: true
        }
    );
    res.json({
        status: "success",
        message: "Nursery updated successfully",
        nursery,
    });
});

// @desc    Delete nursery
// @route   DELETE /api/v1/nurseries/:id
// @access  Private/Admin
export const deleteNurseryCtrl = asyncHandler(async (req, res) => {
    await Nurseries.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Nursery deleted successfully",
    });
});