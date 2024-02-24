import roleApiService from "../service/roleApiService";
import userApiService from "../service/userApiService";
const readFunc = async (req, res) => {
    try {
        let data = await roleApiService.getAllRoles({
            raw: true,
        });
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

const createFunc = async (req, res) => {
    try {
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
        console.log(">> check delete role: ", req.body);
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

module.exports = {
    readFunc,
    createFunc,
    updateFunc,
    deleteFunc,
};
