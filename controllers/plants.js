import asyncHandler from "express-async-handler";
import plant from "../models/plants.js";
import cloudinaryImageUpload from "../config/uploadMultipleFiles.js"
import PlantReview from "../models/plantsReview.js"
// @desc    Create new items
// @route   POST /api/v1/items
// @access  Private/Admin
export const createplantsCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category_id,
        price,
        quantity,
        nursury_id
    } = req.body;
    // plants exist check
    const plantsExists = await plant.findOne({
        name
    });
    if (plantsExists) {
        throw new Error("plant Already Exists");
    }
    // Upload images to Cloudinary
    const urls = await Promise.all(req.files.map(async (file) => {
        const {
            path
        } = file;
        const newPath = await cloudinaryImageUpload(path, {
            folder: "plants"
        });
        return newPath.res;
    }));

    // Create the item
    const plantFound = await plant.create({
        name,
        description,
        category_id,
        user: req.userAuthId,
        price,
        quantity,
        nursury_id,
        images: urls,
    });

    // Send response
    return res.status(200).json({
        status: "success",
        message: "plants created successfully",
        plantFound,
    });
});


// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public

export const getplantsCtrl = asyncHandler(async (req, res) => {
    //query
    let plantsQuery = plant.find();

    //search by name
    if (req.query.name) {
        plantsQuery = plantsQuery.find({
            name: {
                $regex: req.query.name,
                $options: "i"
            },
        });
    }




    //filter by price range
    if (req.query.price) {
        const priceRange = req.query.price.split("-");
        //gte: greater or equal
        //lte: less than or equal to
        plantsQuery = plantsQuery.find({
            price: {
                $gte: priceRange[0],
                $lte: priceRange[1]
            },
        });
    }
    //pagination
    //page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;
    //startIdx
    const startIndex = (page - 1) * limit;
    //endIdx
    const endIndex = page * limit;
    //total
    const total = await plant.countDocuments();

    plantsQuery = plantsQuery.skip(startIndex).limit(limit);;

    //pagination results
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    //await the query
    const plantFound = await plantsQuery;
    res.json({
        status: "success",
        total,
        results: plantFound.length,
        pagination,
        message: "plants fetched successfully",
        plantFound,
    });
});

// @desc    Get single plant with average rating
// @route   GET /api/v1/plants/:id
// @access  Public
export const getplantCtrl = asyncHandler(async (req, res) => {
    // Find all reviews for the plant
    const plantReviews = await PlantReview.find({
        plant_id: req.params.id
    });

    // Find the plant
    const plantFound = await plant.findById(req.params.id);

    if (!plantFound) {
        res.status(404).json({
            status: "error",
            message: "Plant not found",
        });
        return;
    }

    // Calculate average rating
    let ratingsTotal = 0;
    const reviewCount = plantReviews.length;

    if (reviewCount > 0) {
        // Calculate total ratings
        ratingsTotal = plantReviews.reduce((total, review) => total + review.rating, 0);

        // Calculate average rating
        const averageRating = Number(ratingsTotal / reviewCount).toFixed(1);

        res.json({
            status: "success",
            message: "Plant fetched successfully",
            plantFound: {
                ...plantFound.toJSON(),
                averageRating,
                reviewCount,
            },
        });
    } else {
        res.json({
            status: "success",
            message: "Plant fetched successfully",
            plantFound: {
                ...plantFound.toJSON(),
                averageRating: 0,
                reviewCount: 0,
            },
        });
    }
});


// @desc    update  items
// @route   PUT /api/items/:id/update
// @access  Private/Admin

export const updateplantsCtrl = asyncHandler(async (req, res) => {
    const {
        name,
        description,
        category_id,
        price,
        quantity,
        nursury_id,
    } = req.body;
    //validation

    //update
    const plantFound = await plant.findByIdAndUpdate(
        req.params.id, {
            name,
            description,
            category_id,
            nursury_id,
            price,
            quantity,
        }, {
            new: true,
            runValidators: true,
        }
    );
    res.json({
        status: "success",
        message: "plants updated successfully",
        plantFound,
    });
});

// @desc    delete  items
// @route   DELETE /api/items/:id/delete
// @access  Private/Admin
export const deleteplantsCtrl = asyncHandler(async (req, res) => {
    await plant.findByIdAndDelete(req.params.id);
    res.json({
        status: "success",
        message: "Plants deleted successfully",
    });
});