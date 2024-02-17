import mysql from "mysql2/promise";
import db from "../models";

// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

// create the connection, specify bluebird as Promise

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassword(password);

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass,
        });
    } catch (error) {
        console.log(">> check error: ", error);
    }
};

const getUserList = async () => {
    // test relationship
    let newUser = await db.User.findOne({
        where: {
            id: 1,
        },
        attributes: ["id", "username", "email"],
        include: { model: db.Group, attributes: ["name", "description"] },
        raw: true,
        nest: true, // gop cac thuoc tinh cua 1 model vao 1 object
    });

    // let roles = await db.Group.findOne({
    //     where: {
    //         id: 1,
    //     },
    //     include: {
    //         model: db.Role,
    //     },
    //     raw: true,
    //     nest: true,
    // });

    let roles = await db.Role.findAll({
        attributes: ["id", "url", "description"],
        include: {
            model: db.Group,
            where: {
                id: 1,
            },
            attributes: ["name", "description"], // cần những thuộc tính nào thì sẽ ghi vào attributes
        },
        raw: true,
        nest: true,
    });

    console.log(">> check user: ", newUser);
    console.log(">> check role: ", roles);

    let users = [];
    users = await db.User.findAll();
    return users;
};

const deleteUser = async (userId) => {
    await db.User.destroy({
        where: {
            id: userId,
        },
    });
};

const getUserById = async (userId) => {
    let user = {};

    user = await db.User.findOne({
        where: {
            id: userId,
        },
    });

    if (user === null) {
        console.log("Not found!");
    } else {
        return user.get({ plain: true });
    }
};

const updateUserInfo = async (email, username, id) => {
    await db.User.update(
        { email: email, username: username },
        {
            where: {
                id: id,
            },
        }
    );
};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
};
