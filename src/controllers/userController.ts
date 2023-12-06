import * as argon2 from "argon2";
import { NextFunction, Request, Response, response } from "express";
import User from "../models/userModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const registerUser = async (req: Request, res: Response) => {
    const {
        username,
        password,
        confPassword,
        fullname,
        email,
        phone,
        profileImage,
        roleId
    } =  req.body

    if (password != confPassword) {
        let err = {
            name: "ValidationError",
            errors: [
                {
                    message: "Password dan Konfirmasi Password harus sama"
                }
            ]
        }
        return res.status(400).send(failResponse(err))
    }

    // Hash password di backend
    const hashedPassword = await argon2.hash(password)

    await User.create({
        username: username,
        password: hashedPassword,
        fullname: fullname,
        email: email,
        phone: phone,
        profileImage: profileImage,
        roleId: roleId
    }).then(result => {
        return res.status(201).send(successResponse(result))
    }).catch(error => {
        if (error.name == 'SequelizeValidationError') {
            return res.status(400).send(failResponse(error))
        } else {
            return res.status(500).send(errorResponse(error))
        }
    })
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const {
        username,
        password
    } =  req.body

    await User.findOne({
        where: {
            username: username
        }
    }).then(async result => {
        if (Object.keys(result!).length == 0) {
            return res.status(404).send(failResponse(result))
        } else {
            let userPassword = result!.dataValues.password
            let verify = await argon2.verify(userPassword, password)
            if (verify) {
                req.body = result
                return next()
            }
        }
    }).catch(error => {
        return res.status(500).send(errorResponse(error))
    })
}