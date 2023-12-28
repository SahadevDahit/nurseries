import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GiftSchema = new Schema({
    type: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    nursery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurseries", // Assuming you have a "Nurseries" model
        required: true,
    },
});

const Gift = mongoose.model("gifts", GiftSchema);

export default Gift;