import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import {errorService, dbService} from './index.js'
import {Users} from '../Models/index.js'
import {v4} from 'uuid'

dotenv.config();

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const passwd = await bcrypt.hash(password, salt);
    return passwd;
}

const checkParam = (param) => {
    return (param != undefined && param != null)
}

const isUserToken = (user) => {
    return (checkParam(user) && checkParam(user.userUuid))
}

const login = async (email, password) => {
    //return ({status: 500, data: {error: "NO"}})
    let user = await dbService.Users.findOne(
        {
            where: {
                email: email
            },
            attributes: Users.attribute.all,
            raw: true
        }
    );
    if (!user) {
        return({status: 403, data: {error: 'Email invalid'}});
    }
    // Compare password
    let valid = await bcrypt.compare(password, user.password);
    if (!valid) {
        return({status: 403, data: {error: 'Password invalid'}});
    }
    //let {password, ...loguser} = user;
    return ({
        status: 200,
        data: {
            user: user,
            token: jwt.sign(
                {
                    userUuid: user.uuid
                },
                process.env.RANDOM_STRING,
                { expiresIn: 3600 }
            )
        }
    });
}

/*const disable = async (user, uuid) => {
    return ({status: 500, data: {error: "NO"}})
    let res = await dbService.Users.update(
        {
            enable: false
        },
        {
            where: 
            {
                uuid: uuid
            }
        }
    );
    return ("User disable");
}*/

const register = async (email, password, token) => {
    return ({status: 500, data: {error: "NO"}})
    if (!checkParam(body)) {
        
    }
    let checkEmail = await dbService.Users.findOne(
        {
            where: {
                email: body.email
            },
            attributes: Users.attribute.all
        }
    )
    if (checkEmail) {
        return ({status: 400, data: { error: 'Email already exist'}});
    }
    else if (body.username && body.password && body.email) {
        if (body.email.indexOf("@") <= 0) {
            return ({status: 400, data: { error: 'Invalid email'}});
        } else if (body.password.length < 8) {
            return ({status: 400, data: { error: 'Invalid password'}});
        } else {
            let hashed_pw = await hashPassword(body.password);
            let created_user = await dbService.Users.create(
                {
                    uuid: v4(),
                    username: body.username,
                    email: body.email,
                    password: hashed_pw,
                    enable: true
                }
            );
            if (!created_user) {
                return ({status: 500, data: { error: 'Error creation user'}});
            }
            return ({status: 200, data: "Account Created"} );
        }
    }
    else {
        return ({status: 400, data: { error: 'Email already exist'}});
    }
}

const getMe = async (user) => {
    //return ({status: 500, data: {error: "NO"}})
    if (!isUserToken(user)) {
        return ({status: 401, data: {error: "You need to authenticate"}})
    }
    let userDb = await getUser(user.userUuid, "protected")
    if (!userDb) {
        return ({status: 401, data: {error: 'User not found'}});
    }
    return ({status: 200, data: {user: userDb}});
}

const getUser = async (userUuid, type) => {
    let userDb = await dbService.Users.findOne(
        {
            where: {
                uuid: userUuid
            },
            attributes: type == "protected" ? Users.attribute.protected : type == "public" ? Users.attribute.public : Users.attribute.all,
            raw: true
        }
    );
    return (userDb)
}

const editPassword = async (user, oldPassword, newPassword) => {
    if (!isUserToken(user))
        return ({status: 401, data: {error: "You need to authenticate"}})
    if (!checkParam(oldPassword) || !checkParam(newPassword))
        return ({status: 400, data: {error: "Error in password"}})
    let userDb = await getUser(user.userUuid, "all")
    if (!userDb) {
        return ({status: 401, data: {error: 'User not found'}});
    }
    let valid = await bcrypt.compare(oldPassword, userDb.password);
    if (!valid || oldPassword == newPassword || newPassword.length < 8)
        return ({status: 400, data: {error: "Error in password"}})
    let hashed_pw = await hashPassword(newPassword);
    let modUsr = await dbService.Users.update(
        {
            password: hashed_pw,
        },
        {
            where: {
                uuid: user.userUuid
            }
        }
    );
    if (!modUsr)
        return ({status: 500, data: {error: 'Error in db'}});
    return ({ status: 200, data: { message: "Password changed" }});
}

export {login, register, getMe, editPassword}