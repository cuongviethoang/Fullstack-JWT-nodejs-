import mysql from "mysql2/promise";

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
    const connection = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "12346789",
        database: "jwtdb",
        Promise: bluebird,
    });

    try {
        const [rows, fields] = await connection.execute(
            "INSERT INTO users(email, password, username) VALUES (?, ?, ?)",
            [email, hashPass, username]
        );
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

    let users = [];

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

module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
};
