import { Request, Response } from "express";
import Config from "../models/configModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const getConfig = async (req: Request, res: Response) => {
    const {page, perPage} = req.body
    await Config.findAndCountAll().then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        return res.status(500).json(errorResponse(error))
    })
}

export const createConfig = async (req: Request, res: Response) => {
    const {key, value, description} = req.body

    await Config.create({
        key: key,
        value: value,
        description: description
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

export const updateConfig = async (req: Request, res: Response) => {
    const {id, key, value, description} = req.body

    await Config.update({
        key: key,
        value: value,
        description: description
    }, {
        where: {
            id: id
        }
    }).then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        if (error.name == 'SequelizeValidationError') {
            return res.status(400).send(failResponse(error))
        } else {
            return res.status(500).send(errorResponse(error))
        }
    })
}