import { Request, Response } from "express";
import Grade from "../models/gradeModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const getGrade = async (req: Request, res: Response) => {
    const {page, perPage} = req.body
    await Grade.findAndCountAll({
        offset: (page - 1) * perPage,
        limit: perPage
    }).then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        return res.status(500).send(errorResponse(error))
    })
}

export const createGrade = async (req: Request, res: Response) => {
    const {name} = req.body

    await Grade.create({
        name: name
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

export const updateGrade = async (req: Request, res: Response) => {
    const {id, name} = req.body

    await Grade.update({
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

export const deleteGrade = async (req: Request, res: Response) => {
    const {id} = req.body
    await Grade.destroy({
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