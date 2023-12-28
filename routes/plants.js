import exppress from "express";
import {
    createplantsCtrl,
    getplantsCtrl,
    getplantCtrl,
    updateplantsCtrl,
    deleteplantsCtrl,
} from "../controllers/plants.js";
import upload from "../config/multer.js";
import isAdmin from "../middlewares/isAdmin.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const plantsRouter = exppress.Router();

plantsRouter.post(
    "/",
    isLoggedIn,
    isAdmin,
    upload.array("files", 3),
    createplantsCtrl
);

plantsRouter.get("/", getplantsCtrl);
plantsRouter.get("/:id", getplantCtrl);
plantsRouter.put("/:id", isLoggedIn, isAdmin, updateplantsCtrl);
plantsRouter.delete("/:id", isLoggedIn, isAdmin, deleteplantsCtrl);
export default plantsRouter;