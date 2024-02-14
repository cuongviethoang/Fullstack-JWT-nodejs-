import mysql from "mysql2/promise";

// get the promise implementation, we will use bluebird
import bluebird from "bluebird";

// create the connection, specify bluebird as Promise

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const createNewUser = (email, password, username) => {
    let hashPass = hashUserPassword(password);

    // A simple SELECT query
    connection.query(
        "INSERT INTO users(email, password, username) VALUES (?, ?, ?)",
        [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
        }
    );
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
    //  connection.query(
    //     "SELECT * from users",
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err);
    //             return users;
    //         }
    //         users = results;
    //         console.log(">> run get user list: ", users);
    //         return users;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute("SELECT * from users");
        return rows;
    } catch (error) {
        console.log(">> check error: ", error);
    }
};

module.exports = {
    createNewUser,
    getUserList,
};
