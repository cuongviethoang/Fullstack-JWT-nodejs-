import express from "express";
import homeController from "../controller/honeController";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWorld);
    router.get("/user", homeController.handleUserPage);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/delete-user/:id", homeController.deleteUser);
    router.get("/update-user/:id", homeController.getUpdateUserPage);
    router.post("/users/update-user", homeController.handleUpdateUser);

    //test api
    router.get("/api/test-api", apiController.testApi);

    return app.use("/", router); // nạp tất cả router vào app
};

export default initWebRoutes;
