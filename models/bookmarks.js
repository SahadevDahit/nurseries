import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookmarkSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // Assuming you have a "users" model
        required: true,
    },
    nursery_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "nurseries", // Assuming you have a "nurseries" model
        required: function () {
            // Make nursery_id required if plant_id is not present
            return !this.plant_id;
        },
    },
    plant_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "plants", // Assuming you have a "plants" model
        required: function () {
            // Make plant_id required if nursery_id is not present
            return !this.nursery_id;
        },
    },
});

const Bookmark = mongoose.model("bookMarks", BookmarkSchema);

export default Bookmark;