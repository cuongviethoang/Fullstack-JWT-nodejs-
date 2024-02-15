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
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12346789",
        database: "jwtdb",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute("SELECT * from users");
        return rows;
    } catch (error) {
        console.log(">> check error: ", error);
    }
};

const deleteUser = async (id) => {
    // DELETE FROM users WHERE id='Alfreds Futterkiste';
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12346789",
        database: "jwtdb",
        Promise: bluebird,
    });
    try {
        const [rows, fields] = await connection.execute(
            "DELETE FROM users WHERE id=?",
            [id]
        );
    } catch (error) {
        console.log(error);
    }
};

const getUserById = async (id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12346789",
        database: "jwtdb",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "SELECT * from users WHERE id=?",
            [id]
        );
        return rows;
    } catch (error) {
        console.log(">> check error: ", error);
    }
};

const updateUserInfo = async (email, username, id) => {
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12346789",
        database: "jwtdb",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "UPDATE users SET email=?, username=? WHERE id=?",
            [email, username, id]
        );
        return rows;
    } catch (error) {
        console.log(">> check error: ", error);
    }
};

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserById,
    updateUserInfo,
};
