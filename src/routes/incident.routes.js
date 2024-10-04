import { Router } from "express";
import IncidentController from "../controllers/incident.controller.js";

const router = Router()

router.post('/create', IncidentController.store)
router.get('/incidents', IncidentController.getAllIncidents)
router.get('/:id', IncidentController.getById)
router.get('/user/:userid', IncidentController.getIncidentsByUserId)
router.delete('/:id', IncidentController.deletIncident)
router.patch('/:id', IncidentController.updateIncident)



export default router