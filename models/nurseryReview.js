import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NurseryReviewSchema = new Schema({
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

    nursery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurseries", // Assuming you have a "Nurseries" model
        required: true,
    },
});

const NurseryReview = mongoose.model("nurseryReview", NurseryReviewSchema);

export default NurseryReview;