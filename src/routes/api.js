import express from "express";
import apiController from "../controller/apiController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initApiRoutes = (app) => {
    //test api
    router.get("/test-api", apiController.testApi);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    return app.use("/api/v1", router); // nạp tất cả router vào app
};

export default initApiRoutes;
