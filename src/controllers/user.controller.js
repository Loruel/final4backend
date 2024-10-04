import User from "../models/users.js"
import bcrypt from "bcrypt"

class UserController {

    static async store(req, res) {
        try {
            console.log(req.body)
            const { fname, lname, username, email, password, image, rol } = req.body

            if (!fname || !lname || !username || !email || !password || !rol) {
                return res.status(400).json({ message: 'Incomplet data' })
            }

            const encriptatePassword = await bcrypt.hash(password, 10)

            const user = await User.create({
                fname,
                lname,
                username,
                email,
                password: encriptatePassword,
                rol,
                image
            })

            res.status(201).json({ message: 'User created successfully', data: user })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

export default UserController