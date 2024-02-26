import loginRegisterService from "../service/loginRegisterService";
const testApi = (req, res) => {
    return res.status(200).json({
        message: "ok",
        data: "test api",
    });
};

const handleRegister = async (req, res) => {
    try {
        // req.body
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: "Missing required parameter", //error message
                EC: "1", // error code
                DT: "", // data
            });
        }

        if (req.body.password && req.body.password.length < 6) {
            return res.status(200).json({
                EM: "Your password must have more than 6 letters", //error message
                EC: "1", // error code
                DT: "", // data
            });
        }

        // service: create user
        let data = await loginRegisterService.registerNewUser(req.body);
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //
            DT: "", // data
        });
    } catch (e) {
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        if (data && data.EC === 0 && data.DT.access_token) {
            // mỗi khi đăng nhập thành công sẽ tự động tạo cookie có key là jwt với tuổi thọ của cookies 1 tiếng
            res.cookie("jwt", data.DT.access_token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
        }
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, // error code
            DT: data.DT, // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const handleLogout = (req, res) => {
    try {
        //xoa cookies khi dang xuat vi thuoc tinh httpOnly chi cho xoa duoi backend khong cho xoa tren frontend
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: "clear cookies done", //error message
            EC: 0, // error code
            DT: "Logout success", // data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: "error logout from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

module.exports = {
    testApi,
    handleRegister,
    handleLogin,
    handleLogout,
};
