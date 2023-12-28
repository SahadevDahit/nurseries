import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NurserySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String, // Adjust data type based on your needs
        required: true,
    },
    distance: {
        type: String, // Adjust data type based on your needs
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    nurseryReview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurseryReview",
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    }
});

const Nurseries = mongoose.model("nurseries", NurserySchema);

export default Nurseries;