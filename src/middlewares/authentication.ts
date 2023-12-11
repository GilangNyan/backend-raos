import * as argon2 from "argon2";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { errorResponse, failResponse } from "../utils/response";
import User from "../models/userModel";

const secretKey: string = process.env.SECRET_KEY!

export const checkLogin = async (req: Request, res: Response, next: NextFunction) => {
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

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ')
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(failResponse())
            } else {
                res.locals.jwt = jwt.verify(authorization[1], secretKey)
                return next()
            }
        } catch (error) {
            // Pengecekan validitas token, termasuk token expiration
            return res.status(403).send(failResponse(error))
        }
    } else {
        return res.status(401).send(failResponse())
    }
}

export const refreshToken = (req: Request, res: Response) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ')
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(failResponse())
            } else {
                // 
            }
        } catch (error) {
            return res.status(401).send(failResponse())
        }
    } else {
        return res.status(401).send(failResponse())
    }
}