import db from "../models";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { Op } from "sequelize";
import { getGroupWithRoles } from "../service/JWTService";
import { createJWT } from "../middleware/JWTAction";
require("dotenv").config();

// mã hóa mật khẩu
const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
};

// kiểm tra tồn tại email
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

// kiểm tra tồn tại phone
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

// kiểm tra email và phone đã tồn tại chưa sau đó tạo mới user
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
            groupId: 4,
        });

        return {
            EM: "A user us created successfully",
            EC: "0",
        };
    } catch (e) {
        console.log(e);
        return {
            EM: "Something wrongs in service",
            EC: -2,
        };
    }
};

// kiểm tra mật khẩu nhập vào và mật khẩu trong db
const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true or false
};

const handleUserLogin = async (rawData) => {
    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ],
            },
        });

        if (user) {
            let isCorrectPassword = checkPassword(
                rawData.password,
                user.password
            ); // kiểm  tra mật khẩu nhập vào form và mật khẩu trong csdl
            if (isCorrectPassword === true) {
                // let token =

                // test roles
                let groupWithRole = await getGroupWithRoles(user);
                let payload = {
                    email: user.email,
                    username: user.username,
                    groupWithRole,
                };

                let token = createJWT(payload);
                return {
                    EM: "ok!",
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRole,
                        email: user.email,
                        username: user.username,
                    },
                };
            }
        }

        return {
            EM: "Your emai/phone number or password is correct",
            EC: 1,
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "Something wrongs login in service",
            EC: -2,
            DT: "",
        };
    }
};

module.exports = {
    registerNewUser,
    handleUserLogin,
    hashUserPassword,
    checkEmailExit,
    checkPhoneExit,
};
