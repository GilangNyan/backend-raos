import { Request, Response } from "express";
import User from "../models/userModel";
import { successResponse } from "../utils/response";

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
        return res.status(400).json(successResponse())
    }

    User.create({
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        phone: phone,
        profileImage: profileImage,
        roleId: roleId
    }).then(result => {
        return res.status(201).json(successResponse(result))
    }).catch(error => {
        return res.status(400).json(successResponse(error))
    })
}