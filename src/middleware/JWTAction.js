require("dotenv").config();
import jwt from "jsonwebtoken";

const createJWT = () => {
    let payload = { name: "cuong", address: "hai duong" };
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key);
        console.log(token);
    } catch (e) {
        console.log(e);
    }

    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (err) {
        console.log(err);
    }
    return data;
};

module.exports = {
    createJWT,
    verifyToken,
};
