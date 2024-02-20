import db from "../models";
import {
    hashUserPassword,
    checkEmailExit,
    checkPhoneExit,
} from "../service/loginRegisterService";

const getAllUser = async () => {
    try {
        let user = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],
            include: { model: db.Group, attributes: ["name", "description"] },
            // raw: true,
            // nest: true, // gop cac thuoc tinh cua 1 model vao 1 object
        });
        if (user) {
            return {
                EM: "get data success",
                EC: 0,
                DT: user,
            };
        } else {
            return {
                EM: "get data success",
                EC: 0,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with get all user service",
            EC: 1,
            DT: data,
        };
    }
};

const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;
        const { count, rows } = await db.User.findAndCountAll({
            offset,
            limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],
            include: {
                model: db.Group,
                attributes: ["id", "name", "description"],
            },
            order: [["id", "DESC"]],
        });

        let totalPages = Math.ceil(count / limit);

        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows,
        };
        return {
            EM: "get data success with page and limit",
            EC: 0,
            DT: data,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong get user with pagination with service",
            EC: 1,
            DT: data,
        };
    }
};

const createNewUser = async (data) => {
    try {
        let isEmailExit = await checkEmailExit(data.email);
        if (isEmailExit === false) {
            return {
                EM: "The email is already exit",
                EC: 1,
                DT: "email",
            };
        }
        let isPhoneExit = await checkPhoneExit(data.phone);
        if (isPhoneExit === false) {
            return {
                EM: "The phone is already exit",
                EC: 1,
                DT: "phone",
            };
        }

        // hash  user password
        let hashPassword = hashUserPassword(data.password);

        let dataReq = { ...data, password: hashPassword };
        await db.User.create(dataReq);
        return {
            EM: "create new user success",
            EC: 0,
            DT: [],
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "something wrong with create new user service",
            EC: 1,
            DT: [],
        };
    }
};

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "update error because not have groupId",
                EC: 1,
                DT: "group",
            };
        }
        let user = await db.User.findOne({
            where: {
                id: data.id,
            },
        });

        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId,
            });

            return {
                EM: "update user success",
                EC: 0,
                DT: "",
            };
        } else {
            return {
                EM: "User not found when update service",
                EC: 1,
                DT: "",
            };
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: id,
            },
        });

        if (user) {
            await user.destroy();

            return {
                EM: "delete user success",
                EC: 0,
                DT: [],
            };
        } else {
            return {
                EM: "user not exit",
                EC: 2,
                DT: [],
            };
        }
    } catch (e) {
        console.log(e);
        return {
            EM: "error delete user from service",
            EC: -1,
            DT: [],
        };
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
    getUserWithPagination,
};
