import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import roleController from "../controller/roleController";
import { checkUserJwt, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initApiRoutes = (app) => {
    router.all("*", checkUserJwt, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);

    // user routes
    router.get("/account", checkUserJwt, userController.getUserAccount);
    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    // roles routes
    router.get("/role/read", roleController.readFunc);
    router.post("/role/create", roleController.createFunc);
    router.put("/role/update", roleController.updateFunc);
    router.delete("/role/delete", roleController.deleteFunc);
    // group routes
    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1", router); // nạp tất cả router vào app
};

export default initApiRoutes;
