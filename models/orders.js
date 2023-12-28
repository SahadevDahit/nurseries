import mongoose from "mongoose";

const Schema = mongoose.Schema;
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000) + Date.now().toString();

const OrderSchema = new Schema({
    orderNumber: {
        type: String,
        default: randomTxt + randomNumbers,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants",
        required: true,
    },

    paymentStatus: {
        type: String,
        default: "pending",
    },
    paymentMethod: {
        type: String,
        default: "Not specified",
    },
    currency: {
        type: String,
        default: "inr",
    },
    status: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    delivery_fee: {
        type: Number,
        default: 5
    },
    discount: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Order = mongoose.model("orders", OrderSchema);

export default Order;