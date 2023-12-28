import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PlantReviewSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },

    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants", // Assuming you have a "Plants" model
        required: true,
    },
});

const PlantReview = mongoose.model("plantReview", PlantReviewSchema);

export default PlantReview;