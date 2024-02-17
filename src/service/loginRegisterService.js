import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

const checkEmailExit = async (email) => {
    let user = await db.User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return false;
    }
    return true;
};

const checkPhoneExit = async (phone) => {
    let user = await db.User.findOne({
        where: {
            phone: phone,
        },
    });
    if (user) {
        return false;
    }
    return true;
};

const registerNewUser = async (rawUserData) => {
    try {
        // check email/phone are exit
        let isEmailExit = await checkEmailExit(rawUserData.email);
        if (isEmailExit === false) {
            return {
                EM: "The email is already exit",
                EC: 1,
            };
        }
        let isPhoneExit = await checkPhoneExit(rawUserData.phone);
        if (isPhoneExit === false) {
            return {
                EM: "The phone is already exit",
                EC: 1,
            };
        }

        // hash  user password
        let hashPassword = hashUserPassword(rawUserData.password);

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
        });

        return {
            EM: "A user us created successfully",
            EC: 0,
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs in service",
            EC: -2,
        };
    }
};

module.exports = {
    registerNewUser,
};
