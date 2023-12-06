import User from "../models/userModel";

export const registerUserService = async (username: string, password: string, fullname: string, email: string, phone: string, profileImage:string, roleId: number): Promise<any> => {
    await User.create({
        username: username,
        password: password,
        fullname: fullname,
        email: email,
        phone: phone,
        profileImage: profileImage,
        roleId: roleId
    }).then(result => {
        return result
    }).catch(error => {
        return error
    })
}