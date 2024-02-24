import db from "../models";

const createNewRoles = async (roles) => {
    try {
        let currentRoles = await db.Role.findAll({
            attributes: ["url", "description"],
            raw: true, // convert sequelize obj sang js obj
        });

        // lọc các role truyền qua req, chỉ lấy các role chưa có trong db
        const persists = roles.filter(
            ({ url: url1 }) =>
                !currentRoles.some(({ url: url2 }) => url1 === url2)
        );

        console.log(">> check persists:", persists);
        if (persists.length === 0) {
            return {
                EM: "nothing to create new role in service",
                EC: 1,
                DT: [],
            };
        }
        await db.Role.bulkCreate(persists);
        return {
            EM: `create new roles success ${persists.length} role ...`,
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with create new role service",
            EC: 1,
            DT: [],
        };
    }
};

const getAllRoles = async () => {
    try {
        let data = await db.Role.findAll({ order: [["id", "DESC"]] });
        return {
            EM: "Get all roles success",
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with get all roles service",
            EC: 1,
            DT: [],
        };
    }
};

const deleteRole = async (id) => {
    try {
        let data = await db.Role.findOne({
            where: {
                id: id,
            },
        });

        if (data) {
            await data.destroy();
            return {
                EM: "Delete role is success",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "Could not find role to delete",
                EC: 1,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with delete role service",
            EC: 1,
            DT: [],
        };
    }
};

module.exports = {
    createNewRoles,
    getAllRoles,
    deleteRole,
};
