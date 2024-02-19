import db from "../models";

const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order: [["name", "ASC"]],
        });

        return {
            EM: "get groups success",
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "error from service",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    getGroups,
};
