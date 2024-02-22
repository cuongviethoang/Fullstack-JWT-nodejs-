import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            // khi lấy dữ liệu từ req.query ra thì kết quả đang ở dạng string cần convert sang number
            let data = await userApiService.getUserWithPagination(
                +page,
                +limit
            );

            // console.log(">>> check data: ", data);

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT, // data
            });
        } else {
            let data = await userApiService.getAllUser();

            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT, // data
            });
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const createFunc = async (req, res) => {
    try {
        let data = await userApiService.createNewUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body);

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error update user from server", //error message
            EC: 1, // error code
            DT: "", // data
        });
    }
};

const deleteFunc = async (req, res) => {
    try {
        // console.log(">> check req: ", req.body);
        let data = await userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server", //error message
            EC: "-1", // error code
            DT: "", // data
        });
    }
};

// hàm này được tạo ra để kiểm tra mỗi khi refresh lại client , client sẽ gửi 1 api / account về server
// server sẽ lấy token và thông tin người dùng trong req gửi đến
// với mục đích check thông tin người dùng sau mỗi lần refresh
const getUserAccount = async (req, res) => {
    return res.status(200).json({
        EC: 0,
        EM: "ok",
        DT: {
            access_token: req.token,
            groupWithRole: req.user.groupWithRole,
            email: req.user.email,
            username: req.user.username,
        },
    });
};

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
    getUserAccount,
};
