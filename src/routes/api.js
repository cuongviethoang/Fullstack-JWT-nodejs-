import express from "express";
import apiController from "../controller/apiController";
import userController from "../controller/userController";
import groupController from "../controller/groupController";
import { checkUserJwt, checkUserPermission } from "../middleware/JWTAction";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

// kiểm tra nếu req.path = với những path không cần jwt sẽ được next còn những
// path cần jwt phải qua xử lý middleware mới có thể next.
// const checkUserLogin = (req, res, next) => {
//     const nonSecurePaths = ['/', '/register', '/login'];
//   if (nonSecurePaths.includes(req.path)) return next();

//   //authenticate user
//   next();
// }

const initApiRoutes = (app) => {
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);

    router.get(
        "/user/read",
        checkUserJwt,
        checkUserPermission,
        userController.readFunc
    );
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);

    return app.use("/api/v1", router); // nạp tất cả router vào app
};

export default initApiRoutes;
