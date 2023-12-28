import exppress from "express";

import {
    createCategoryCtrl,
    getAllCategoriesCtrl,
    getSingleCategoryCtrl,
    updateCategoryCtrl,
    deleteCategoryCtrl,
} from "../controllers/categories.js";
import {
    isLoggedIn
} from "../middlewares/isLoggedIn.js";

const categoriesRouter = exppress.Router();

categoriesRouter.post(
    "/",
    isLoggedIn,

    createCategoryCtrl
);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.delete("/:id", isLoggedIn, deleteCategoryCtrl);
categoriesRouter.put("/:id", isLoggedIn, updateCategoryCtrl);
export default categoriesRouter;