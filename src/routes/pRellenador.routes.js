import { Router } from "express";
import {
  renderCrellenadorForm,
  createNewCrellenador,
  renderCrellenadors,
  renderEditForm,
  updateCrellenador,
  deleteCrellenador,
} from "../controllers/Crellenador";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/prellenador/add", isAuthenticated, renderCrellenadorForm);

router.post("/prellenador/new-prellenador", isAuthenticated, createNewCrellenador);

// Get All Notes
router.get("/prellenadors", isAuthenticated, renderCrellenadors);

// Edit Notes
router.get("/prellenador/edit/:id", isAuthenticated, renderEditForm);

router.put("/prellenadors/edit-prellenador/:id", isAuthenticated, updateCrellenador);

// Delete Notes
router.delete("/prellenadors/delete/:id", isAuthenticated, deleteCrellenador);

export default router;
