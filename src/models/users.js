import { pool } from "../config/db.js"

class User {

    static async findById(id) {
        const [user] = await pool.execute(
            'SELECT  user_id, f_name, l_name, username, email, password, image, rol FROM users WHERE user_id = ?', [id]
        )
        return user[0]
    }

    static async findOne(columna, valor) {
        const [user] = await pool.execute(
            `SELECT user_id, f_name, l_name, username, email, password, image, rol FROM users WHERE ${columna} = ?`, [valor]
        )
        return user[0]
    }

    static async finAll(){
        const [users] = await pool.execute(
            'SELECT user_id, f_name, l_name, username, email, password, image, rol FROM users'
        )
        return users
    }

    static async create({
        fname,
        lname,
        username,
        email,
        password,
        image,
        rol
    }) {
        
        const requiredFields = [
            'f_name',
            'l_name',
            'username',
            'email',
            'password',
            'rol'
        ]

        const saveFields = [fname, lname, username, email, password, rol]

        if (image) {
            requiredFields.push('image')
            saveFields.push(image)
        }

        const stringRequiredFields = requiredFields.join(',')
        const placeholders = requiredFields.map(() => '?').join(',')

        const query = `INSERT INTO users(${stringRequiredFields}) VALUES (${placeholders})`
        const [result] = await pool.execute(query, saveFields)
        const user = await this.findById(result.insertId)

        delete user.password

        return user
    }

}

export default User