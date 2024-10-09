import User from "../models/users.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/config.js";

class AuthController {

    static async getAllUsers(req, res) {
        try {
            const users = await User.finAll()
            res.status(200).json({ message: 'Users retrieved successfully', data: users })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async register(req, res) {
        try {
            const { fname, lname, username, email, image, rol } = req.body

            const existEmail = await User.findOne('email', email)
            if (existEmail) return res.status(400).json({ message: 'This email has already been registered' })

            const exisUser = await User.findOne('username', username)
            if (exisUser) return res.status(400).json({ message: 'This username has already been registered' })

            if (!fname || !lname || !username || !email || !rol) {
                return res.status(400).json({ message: 'All fields are required' })
            }

            const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailValidate.test(email)) {
                return res.status(400).json({ message: 'The email is not in a valid format' })
            }

            const fixedPassword = 'Funval123'

            const encriptatePassword = await bcrypt.hash(fixedPassword, 10)

            const newUser = {
                fname,
                lname,
                username,
                email,
                password: encriptatePassword,
                rol,
                image
            }

            const result = await User.create(newUser)

            res.status(201).json({ message: 'User created successfully', data: result })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async login(req, res) {
        try {
            const { username, password } = req.body

            if (!username || !password) {
                return res.status(400).json({ message: 'Username and password required' })
            }

            const user = await User.findOne('username', username)
            if (!user) return res.status(404).json({
                message: 'User not found'
            })

            const validatePassword = await bcrypt.compare(password, user.password)
            if (!validatePassword) return res.status(401).json({ message: 'Invalid data' })

            const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1y' })

            res.json({ message: 'Successful login', token, user })

        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async me(req, res) {
        try {
            delete req.user.password
            res.json(req.user)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}

export default AuthController