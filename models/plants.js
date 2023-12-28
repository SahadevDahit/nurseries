// items schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categories",
        required: true,
    },
    nursery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurseries",
    },
    plantReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plantReview",
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users",
    },
    images: [{
        type: String,
        required: false,
    }],
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },

}, {
    timestamps: true,

});


const Plants = mongoose.model("plants", PlantSchema);

export default Plants;