// Bookmark Controller (bookmark.js)

import asyncHandler from "express-async-handler";
import Bookmark from "../models/bookmarks.js";

// @desc    Create new bookmark
// @route   POST /api/v1/bookmarks
// @access  Private/User
export const createBookmarkCtrl = asyncHandler(async (req, res) => {
    const {
        nursery_id,
        plant_id
    } = req.body;

    // Check if the bookmark already exists
    const existingBookmark = await Bookmark.findOne({
        user: req.userAuthId,
        nursery_id,
        plant_id
    });

    if (existingBookmark) {
        throw new Error("Bookmark already exists");
    }

    // Create bookmark
    const bookmark = await Bookmark.create({
        user: req.userAuthId,
        nursery_id,
        plant_id
    });

    res.status(201).json({
        success: true,
        message: "Bookmark created successfully",
        bookmark,
    });
});

// @desc    Get all bookmarks
// @route   GET /api/v1/bookmarks
// @access  Public
export const getAllBookmarksCtrl = asyncHandler(async (req, res) => {
    const filter = {
        user: req.userAuthId
    };

    // Check if either nursery_id or plant_id is provided in the query parameters
    if (req.query.nursery_id) {
        filter.nursery_id = req.query.nursery_id;
    }

    if (req.query.plant_id) {
        filter.plant_id = req.query.plant_id;
    }

    const bookmarksFound = await Bookmark.find(filter)
        .populate('user')
        .populate('nursery_id')
        .populate('plant_id');

    res.json({
        success: true,
        message: "Bookmarks fetched successfully",
        bookmarksFound,
    });
});


// @desc    Get single bookmark by ID
// @route   GET /api/v1/bookmarks/:id
// @access  Public
export const getSingleBookmarkCtrl = asyncHandler(async (req, res) => {
    const bookmark = await Bookmark.findById(req.params.id);

    if (!bookmark) {
        throw new Error("Bookmark not found");
    }

    res.json({
        success: true,
        message: "Bookmark fetched successfully",
        bookmark,
    });
});

// @desc    Update bookmark by ID
// @route   PUT /api/v1/bookmarks/:id
// @access  Private/User
export const updateBookmarkCtrl = asyncHandler(async (req, res) => {
    const {
        nursery_id,
        plant_id
    } = req.body;

    const bookmark = await Bookmark.findByIdAndUpdate(
        req.params.id, {
            nursery_id,
            plant_id
        }, {
            new: true,
        }
    );

    if (!bookmark) {
        throw new Error("Bookmark not found");
    }

    res.json({
        success: true,
        message: "Bookmark updated successfully",
        bookmark,
    });
});

// @desc    Delete bookmark by ID
// @route   DELETE /api/v1/bookmarks/:id
// @access  Private/Use

export const deleteBookmarkCtrl = asyncHandler(async (req, res) => {
    await Bookmark.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "bookmark deleted successfully",
    });
});