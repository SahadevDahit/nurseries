import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SavedAddressSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    receiver_name: {
        type: String,
        required: true,
    },
    receiver_contact: {
        type: String,
        required: true,
    },
    streetAddress: {
        type: String,
        required: true,
    },
    apartment: {
        type: String,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    zipcode: {
        type: String,
        required: true,
    },
});

const SavedAddress = mongoose.model("savedAddress", SavedAddressSchema);

export default SavedAddress;