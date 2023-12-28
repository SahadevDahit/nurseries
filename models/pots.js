import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PotSchema = new Schema({
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants", // Assuming you have a "Plants" model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Pot = mongoose.model("pots", PotSchema);

export default Pot;