import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

});

const Categories = mongoose.model("Categories", CategorySchema);

export default Categories;