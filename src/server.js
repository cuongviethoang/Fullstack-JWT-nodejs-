import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config(); // sử dụng câu lệnh này ta mới lấy được các biến trong file .env thông qua process.env
import bodyParser from "body-parser";
// import connection from "./config/connectDB";

const app = express();

const PORT = process.env.PORT || 8080;

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With, Content-Type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

// config view engine
configViewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test connection db
// connection();

// init web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>>>> JWT Backend is running on the port = " + PORT);
});
