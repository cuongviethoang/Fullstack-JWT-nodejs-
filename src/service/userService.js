import mysql from "mysql2";

import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

// Create the connection to database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12346789",
    database: "jwtdb",
});

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

const getUserList = () => {
    let user = [];
    connection.query("SELECT * from users", function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log("check result: ", results);
    });
};

module.exports = {
    createNewUser,
    getUserList,
};
