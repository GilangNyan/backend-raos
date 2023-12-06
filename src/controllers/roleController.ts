import { Request, Response } from "express";
import Role from "../models/roleModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const createRole = async (req:Request, res: Response) => {
    const {name} = req.body

    await Role.create({
        name: name
    }).then(result => {
        return res.status(201).json(successResponse(result))
    }).catch(error => {
        if (error.name == 'SequelizeValidationError') {
            return res.status(400).json(failResponse(error))
        } else {
            return res.status(500).json(errorResponse(error))
        }
    })
}