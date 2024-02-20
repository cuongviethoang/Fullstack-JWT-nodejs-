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
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT, // data
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            EM: "error from server",
            EC: "-1",
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

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};
