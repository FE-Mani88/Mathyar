import { hashSync, compare } from "bcryptjs";
import { sign, verify } from 'jsonwebtoken'
import { cookies } from "next/headers";

export const hashPasswordHandler = (password) => {
    const hashedPassword = hashSync(password)
    return hashedPassword
}

export const generateToken = async (data) => {
    const token = sign({ ...data }, process.env.PRIVATE_KEY, {
        expiresIn: '480h'
    })
    return token
}

export const verifyPassword = async (password, hashedPassword) => {
    const isPasswordCorrect = await compare(password, hashedPassword)
    return isPasswordCorrect
}

export const verifyToken = (token) => {
    try {
        const verifyResult = verify(token, process.env.PRIVATE_KEY)
        return verifyResult
    } catch (error) {
        return false
    }
}