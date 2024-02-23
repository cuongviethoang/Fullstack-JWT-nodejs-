require("dotenv").config();
import jwt from "jsonwebtoken";

const nonSecurePaths = ["/", "/register", "/login", "/logout"];

//     if (nonSecurePaths.includes(req.path)) return next();

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
    } catch (e) {
        console.log(e);
    }

    return token;
};

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;

    try {
        decoded = jwt.verify(token, key);
    } catch (err) {
        console.log(err);
    }
    return decoded;
};

// check người dùng đã đăng nhập hay chưa bang token trong header
const extractToken = (req) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer" &&
        req.headers.authorization.split(" ")[1] !== "null"
    ) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

// check người dùng đã đăng nhập hay chưa bang cookies hoac authorize bearer
const checkUserJwt = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) return next();
    // lấy tát cả cookies người dùng gửi lên
    let cookies = req.cookies;
    let tokenFromHeader = extractToken(req);
    if (cookies.jwt || tokenFromHeader) {
        let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeader;
        let decoded = verifyToken(token);

        if (decoded) {
            // đính kèm user vào req rồi gửi tới server(đính kèm dữ liệu tùy ý )
            req.user = decoded;
            req.token = token;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: "",
                EM: "not decode of verify in middleware",
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "not cookies in middleware",
        });
    }
};

// check nguoi dùng có quyền truy cập url này không
const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path) || req.path === "/account")
        return next();
    // middleware thứ 2 sẽ nhận tất cả req mà middleware 1 gửi đi trong cùng 1 url
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRole.Roles;
        // lấy url khi thực hiện chạy hàm này
        let currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                EC: -1,
                DT: "",
                EM: "you don't have permission to access thí resource",
            });
        }
        let canAccess = roles.some((item) => item.url === currentUrl);

        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                DT: "",
                EM: "you don't permission to access this resource",
            });
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: "",
            EM: "not jwt in middleware",
        });
    }
};

module.exports = {
    createJWT,
    verifyToken,
    checkUserJwt,
    checkUserPermission,
};
