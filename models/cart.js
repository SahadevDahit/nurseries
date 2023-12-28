import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants", // Assuming you have a "Plants" model
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1,
    },
});

const Cart = mongoose.model("carts", CartSchema);

export default Cart;