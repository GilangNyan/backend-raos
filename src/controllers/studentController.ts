import { Request, Response } from "express"
import Student from "../models/studentModel"
import { errorResponse, successResponse } from "../utils/response"

export const getStudent = async (req: Request, res: Response) => {
    const {page, perPage} = req.body
    await Student.findAndCountAll({
        offset: (page - 1) * perPage,
        limit: perPage
    }).then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        return res.status(500).send(errorResponse(error))
    })
}