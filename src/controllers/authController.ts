import * as argon2 from "argon2";
import { NextFunction, Request, Response, response } from "express";
import * as jwt from "jsonwebtoken";
import User from "../models/userModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";
import { hash } from "../utils/crypt";
import Config from "../models/configModel";

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

export const loginUser = async (req: Request, res: Response) => {
    const secretKey:string = process.env.SECRET_KEY!
    try {
        // Ambil waktu expire token
        let expireTime = await Config.findOne({
            where: {
                key: 'jwtExpirationTime'
            }
        })
        let expireMinute = expireTime?.dataValues.value.toString() + 'm'
        // Buat Token dan Refresh Token
        let refreshId = req.body.dataValues.id + secretKey
        let hashRefresh = hash(refreshId)
        req.body.dataValues.refreshKey = hashRefresh.split('$')[0]
        let token = jwt.sign(req.body.dataValues, secretKey, {expiresIn: expireMinute})
        let b = Buffer.from(hashRefresh.split('$')[1])
        let refreshToken = b.toString('base64')
        let accessToken = {
            accessToken: token,
            refreshToken: refreshToken
        }
        return res.status(200).send(successResponse(accessToken))
    } catch (error) {
        return res.status(500).send(errorResponse('error jwt'))
    }
}