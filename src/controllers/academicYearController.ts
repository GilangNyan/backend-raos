import { Request, Response } from "express";
import AcademicYear from "../models/academicYearModel";
import { errorResponse, failResponse, successResponse } from "../utils/response";

export const getAcademicYear = async (req: Request, res: Response) => {
    const {page, perPage} = req.body
    await AcademicYear.findAndCountAll({
        offset: (page - 1) * perPage,
        limit: perPage
    }).then(result => {
        return res.status(200).send(successResponse(result))
    }).catch(error => {
        return res.status(500).send(errorResponse(error))
    })
}

export const createAcademicYear = async (req: Request, res: Response) => {
    const {startYear, endYear} = req.body

    await AcademicYear.create({
        startYear: startYear,
        endYear: endYear
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

export const updateAcademicYear = async (req: Request, res: Response) => {
    const {id, startYear, endYear} = req.body

    await AcademicYear.update({
        startYear: startYear,
        endYear: endYear
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

export const deleteAcademicYear = async (req: Request, res: Response) => {
    const {id} = req.body

    await AcademicYear.destroy({
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