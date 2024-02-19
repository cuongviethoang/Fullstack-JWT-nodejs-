import db from "../models";

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
            EM: "something wrong with service",
            EC: 1,
            DT: data,
        };
    }
};

const createNewUser = async (data) => {
    try {
        await db.User.create({});
    } catch (e) {
        console.log(e);
    }
};

const updateUser = async (data) => {
    try {
        let user = await db.User.findOne({
            where: {
                id: data.id,
            },
        });

        if (user) {
            user.save({});
        } else {
        }
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (id) => {
    try {
        await db.User.delete({
            where: {
                id: id,
            },
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    getAllUser,
    createNewUser,
    updateUser,
    deleteUser,
};
