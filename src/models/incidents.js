import { pool } from "../config/db.js";

class Incident {

    static async findById(id) {
        const [incident] = await pool.execute(
            'SELECT incident_id, title, type, description, image, created_at, status, userId FROM incidents WHERE incident_id = ?', [id]
        )
        return incident[0]
    }

    static async findByUserId(userId) {
        const [incidents] = await pool.execute(
            'SELECT incident_id, title, type, description, image, created_at, status, userId FROM incidents WHERE userId = ?',
            [userId]
        )
        return incidents
    }

    static async findAll() {
        const [incidents] = await pool.execute(
            'SELECT incident_id, title, type, description, image, created_at, status, userId FROM incidents'
        )
        return incidents
    }

    static async deleteById(id) {
        const [result] = await pool.execute('DELETE FROM incidents WHERE incident_id = ?', [id])
        return result
    }

    static async create({
        title,
        type,
        description,
        status,
        image/* ,
        userId */
    }) {

        const requiredFields = [
            'title',
            'type',
            'status',
            'description'/* ,
            'userId' */
        ]

        const saveFields = [title, type, status, description/* , userId */]

        if (image) {
            requiredFields.push('image')
            saveFields.push(image)
        }

        const stringRequiredFields = requiredFields.join(',')
        const placeholders = requiredFields.map(() => '?').join(',')

        const query = `INSERT INTO incidents(${stringRequiredFields}) VALUES (${placeholders})`
        const [result] = await pool.execute(query, saveFields)
        const incident = await this.findById(result.insertId)

        return incident
    }

    static async update({
        incident_id,
        title,
        type,
        description,
        image,
        status
    }) {

        let query = 'UPDATE incidents SET'
        const fieldsUpdate = []
        const valuesUpdate = []

        if (title) {
            fieldsUpdate.push('title = ?')
            valuesUpdate.push(title)
        }

        if (type) {
            fieldsUpdate.push('type = ?')
            valuesUpdate.push(type)
        }

        if (description) {
            fieldsUpdate.push('description = ?')
            valuesUpdate.push(description)
        }

        if (image) {
            fieldsUpdate.push('image = ?')
            valuesUpdate.push(image)
        }

        if (status) {
            fieldsUpdate.push('status = ?')
            valuesUpdate.push(status)
        }

        if (fieldsUpdate.length === 0) return undefined

        query += ' ' + fieldsUpdate.join(',') + ' WHERE incident_id = ?'

        valuesUpdate.push(incident_id)

        const [result] = await pool.execute(query, valuesUpdate)
        return result
    }

}

export default Incident