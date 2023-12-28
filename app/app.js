import express from "express";
import dotenv from "dotenv";
import helmet from 'helmet';
dotenv.config();
import dbConnect from "../config/dbConnect.js";
import {
    globalErrhandler,
    notFound
} from "../middlewares/globalErrHandler.js";
import cors from "cors";
import userRoutes from "../routes/users.js";
import categories from "../routes/categories.js";
import plant from "../routes/plants.js";
import nurseries from "../routes/nurseries.js"
import nurseryReview from "../routes/nurseryReview.js";
import plantReview from "../routes/plantsReview.js";
import Bookmarks from "../routes/bookMarks.js";
import Gift from "../routes/gifts.js";
import Cart from "../routes/cart.js";
import SavedAddress from "../routes/savedAddress.js";
import Order from "../routes/orders.js";
import Pot from "../routes/pots.js";
const app = express();
app.disable('x-powered-by');
app.use(cors());
app.use(helmet())
//pass incoming data
app.use(express.json());
//url encoded
app.use(express.urlencoded({
    extended: true
}));
dbConnect();
//routes
app.use("/v1/users", userRoutes);
app.use("/v1/categories", categories);
app.use("/v1/plants", plant);
app.use("/v1/nurseries", nurseries);
app.use("/v1/nurseryReview", nurseryReview);
app.use("/v1/plantReview", plantReview);
app.use("/v1/bookMarks", Bookmarks);
app.use("/v1/gifts", Gift);
app.use("/v1/carts", Cart);
app.use("/v1/savedAddress", SavedAddress);
app.use("/v1/orders", Order);
app.use("/v1/pots", Pot);
app.get("/", (req, res) => {
    res.send("Welcome to Zomato backend API");
})

//err middleware
app.use(notFound);
app.use(globalErrhandler);

export default app;