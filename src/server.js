import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config(); // sử dụng câu lệnh này ta mới lấy được các biến trong file .env thông qua process.env

const app = express();
const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>>>> JWT Backend is running on the port = " + PORT);
});
