import express from "express";
import homeController from "../controller/honeController";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    return app.use("/", router); // nạp tất cả router vào app
};

export default initWebRoutes;
