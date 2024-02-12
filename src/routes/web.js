import express from "express";

const router = express.Router();

/**
 *
 * @param {*} app : express app
 */
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello world");
    });

    return app.use("/", router); // nạp tất cả router vào app
};

export default initWebRoutes;
