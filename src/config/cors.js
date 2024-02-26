require("dotenv").config();

const configCors = (app) => {
    // Add headers before the routes are defined
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
        res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "X-Requested-With, Content-Type, Authorization"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        if (req.method === "OPTIONS") {
            return res.sendStatus(200);
        }
        next();
    });
};

export default configCors;
