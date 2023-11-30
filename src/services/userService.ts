import * as argon2 from "argon2";
import User from "../models/userModel";

export const registerUserService = async (username: string, password: string): Promise<any> => {
    try {
        // Cek username
        const userExist = await User.findOne({
            where: {username}
        })
        if (userExist) {
            return {
                success: false,
                message: "Username sudah digunakan"
            }
        }

        // Hash password di backend
        const hashedPassword = await argon2.hash(password)

        // Simpan data user ke database
        await User.create({
            username: username,
            password: hashedPassword
        })

        return {
            success: true,
            message: "Berhasil mendaftarkan pengguna"
        }
    } catch (error) {
        return {
            success: false,
            message: "Gagal mendaftarkan pengguna",
            error: error
        }
    }
}