import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { errorResponse, failResponse, successResponse } from "../utils/response";
import { hash } from "../utils/crypt";

const secretKey: string = 'S@y4Svk@M4kanN@si'

export const generateToken = (req: Request, res: Response) => {
    try {
        let refreshId = req.body.dataValues.id + secretKey
        let hashRefresh = hash(refreshId)
        req.body.dataValues.refreshKey = hashRefresh.split('$')[0]
        let token = jwt.sign(req.body.dataValues, secretKey, {expiresIn: '10m'})
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

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ')
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(failResponse)
            } else {
                res.locals.jwt = jwt.verify(authorization[1], secretKey)
                return next()
            }
        } catch (error) {
            return res.status(403).send(failResponse(error))
        }
    } else {
        return res.status(401).send(failResponse())
    }
}