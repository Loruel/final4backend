import Incident from "../models/incidents.js"

export const validateIncidentID = async (req, res, next) => {
    try {
        const { id } = req.params
        console.log('ID recibido:', id)
        const incident = await Incident.findById(id)

        if (!incident) {
            return res.status(404).json({ message: 'El incidente no existe' })
        }

        req.incident = incident
        next()
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
