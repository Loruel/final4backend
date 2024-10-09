import User from "../models/users.js"
import { SECRET_KEY } from "../config/config.js"
import jwt from "jsonwebtoken"

export const validateJWT = async (req, res, next) => {
    try {
        const { authorization } = req.headers

        if (!authorization || !authorization.startsWith('Bearer ')) {
            return res.status(400).json({ message: 'Se debe proveer un token' })
        }

        const token = authorization.split(' ')[1]

        const decodificado = jwt.verify(token, SECRET_KEY)

        const user = await User.findById(decodificado.userId)

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        req.user = user
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) return res.status(400).json({ message: 'Token expirado' })

        if (error instanceof jwt.JsonWebTokenError) return res.status(400).json({ message: 'Token inválido' })

        res.status(500).json({ message: 'Error al validar el token' })
    }
}