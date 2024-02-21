import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config(); // sử dụng câu lệnh này ta mới lấy được các biến trong file .env thông qua process.env
import bodyParser from "body-parser";
import { createJWT, verifyToken } from "./middleware/JWTAction";

const app = express();

const PORT = process.env.PORT || 8080;

// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cau hinh cors
configCors(app);

// test jwt
createJWT();
let decodedData = verifyToken(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY3VvbmciLCJhZGRyZXNzIjoiaGFpIGR1b25nIiwiaWF0IjoxNzA4NDg0OTg4fQ.ZjpxDCByRtHjVJYXfVHEMxAAKCmIo_4ib8Sh4mmIwgQ"
);
console.log(decodedData);

// init web routes
initWebRoutes(app);
initApiRoutes(app);

app.listen(PORT, () => {
    console.log(">>>>> JWT Backend is running on the port = " + PORT);
});
