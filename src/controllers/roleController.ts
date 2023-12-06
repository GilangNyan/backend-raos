import { Request, Response } from "express";
import Role from "../models/roleModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const getRole = async (req: Request, res: Response) => {
    const {pages, perPage} = req.body
    await Role.findAndCountAll().then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        return res.status(500).send(errorResponse(error))
    })
}

export const createRole = async (req: Request, res: Response) => {
    const {name} = req.body

    await Role.create({
        name: name
    }).then(result => {
        return res.status(201).json(successResponse(result))
    }).catch(error => {
        if (error.name == 'SequelizeValidationError') {
            return res.status(400).send(failResponse(error))
        } else {
            return res.status(500).send(errorResponse(error))
        }
    })
}

export const updateRole = async (req: Request, res: Response) => {
    const {id, name} = req.body

    await Role.update({
        name: name
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

export const deleteRole = async (req: Request, res: Response) => {
    const {id} = req.body

    await Role.destroy({
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