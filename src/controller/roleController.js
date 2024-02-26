import roleApiService from "../service/roleApiService";
const readFunc = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            // khi lấy dữ liệu từ req.query ra thì kết quả đang ở dạng string cần convert sang number
            let data = await roleApiService.getRoleWithPagination(
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
            let data = await roleApiService.getAllRoles();

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
        console.log(">> check data create role in controller: ", req.body);
        let data = await roleApiService.createNewRoles(req.body);

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
        let data = await roleApiService.updateRole(req.body.data);

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
        console.log(">> check data delete role in controller: ", req.body);
        let data = await roleApiService.deleteRole(req.body.id);
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

const getRolesByGroup = async (req, res) => {
    try {
        let groupId = req.params.groupId;
        let data = await roleApiService.getRolesByGroup(groupId);
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

const assignRolesToGroup = async (req, res) => {
    try {
        let data = await roleApiService.assignRolesToGroup(req.body.data);
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
    getRolesByGroup,
    assignRolesToGroup,
};
