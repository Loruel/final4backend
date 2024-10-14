import Incident from "../models/incidents.js"

class IncidentController {

    static async getAllIncidents(req, res) {
        try {
            const incidents = await Incident.findAll()
            res.status(200).json({ message: 'Incidents retrieved successfully', data: incidents })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getById(req, res) {
        const id = req.params.id
        try {
            const incident = await Incident.findById(id)

            if (!incident) {
                return res.status(404).json({ message: 'Incident not found' })
            }

            res.status(200).json({ message: 'Incident retrieved successfully', data: incident })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async getIncidentsByUserId(req, res) {
        const { userId } = req.params
        try {
            const incidents = await Incident.findByUserId(userId)
            if (incidents.length === 0) {
                return res.status(404).json({ message: 'No incidents found for this user' })
            }
            res.status(200).json({ message: 'Incidents retrieved successfully', data: incidents })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    static async deletIncident(req, res) {
        const { id } = req.params
        try {
            const result = await Incident.deleteById(id)
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Incident not found' })
            }
            res.status(200).json({ message: 'Incident deleted successfully' })
        } catch (error) {
            res.status(400).json({ message: 'Error deleting incident' })
        }
    }

    static async store(req, res) {
        try {
            const { title, type, description, image = null } = req.body
            const userId = req.user ? req.user.user_id : req.body.userId

            console.log('userId:', userId)

            if (!title || !type || !description) {
                return res.status(400).json({ message: 'Incomplet data' })
            }

            const statusDefault = 'earring'

            const incident = await Incident.create({
                title,
                type,
                description,
                status: statusDefault,
                image: image || null,
                userId
            })

            res.status(201).json({ message: 'Incidet created successfully', data: incident })
        } catch (error) {
            console.error('Error creating incident:', error)
            res.status(500).json({ message: error.message })
        }

    }

    static async updateIncident(req, res) {
        try {

            const { title, type, description, image, status } = req.body
            const incidentId = req.incident.incident_id

            const updateInci = await Incident.update({
                incident_id: incidentId,
                title,
                type,
                description,
                image,
                status
            })

            if (!updateInci || updateInci.affectedRows === 0) {
                return res.status(404).json({ message: 'No existen datos que actualizar' })
            }

            const incident = await Incident.findById(incidentId)
            res.status(200).json({ message: 'incident updated successfully', data: incident })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

}

export default IncidentController