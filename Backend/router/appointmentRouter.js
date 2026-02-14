import express from "express"
import { deleteAppointment, getAllAppointments, postAppointment, updateAppointmentStatus } from "../controller/appointmentController.js"
import { isAdminAuthenticated, isPatientAuthenticated } from "../middlewares/auth.js";
import { getDashboardStats } from "../controller/appointmentController.js";
import { getTodayAppointments } from "../controller/appointmentController.js";

const router = express.Router();
router.post("/post", isPatientAuthenticated, postAppointment);
router.get("/getall", isAdminAuthenticated, getAllAppointments);
router.put("/update/:id", isAdminAuthenticated, updateAppointmentStatus);
router.delete("/delete/:id", isAdminAuthenticated, deleteAppointment);
router.get("/stats", isAdminAuthenticated, getDashboardStats);
router.get("/today", isAdminAuthenticated, getTodayAppointments);


export default router; 