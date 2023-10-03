import { Router } from "express";
import {
  renderEmpleadoForm,
  createNewEmpleado,
  renderEmpleados,
  renderEditForm,
  updateEmpleado,
  deleteEmpleado,
} from "../controllers/empleado.controller";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/empleado/add", isAuthenticated, renderEmpleadoForm);

router.post("/empleado/new-empleado", isAuthenticated, createNewEmpleado);

// Get All Notes
router.get("/empleados", isAuthenticated, renderEmpleados);

// Edit Notes
router.get("/empleados/edit/:id", isAuthenticated, renderEditForm);

router.put("/empleados/edit-empleado/:id", isAuthenticated, updateEmpleado);

// Delete Notes
router.delete("/empleados/delete/:id", isAuthenticated, deleteEmpleado);

export default router;
