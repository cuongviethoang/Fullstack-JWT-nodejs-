require("dotenv").config(); // sử dụng câu lệnh này ta mới lấy được các biến trong file .env thông qua process.env
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie-parser
app.use(cookieParser());

// cau hinh cors
configCors(app);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>>>> JWT Backend is running on the port = " + PORT);
});
