import { Router } from "express";
import {
  renderCtrazadorForm,
  createNewCtrazador,
  renderCtrazadors,
  renderEditForm,
  updateCtrazador,
  deleteCtrazador,
} from "../controllers/Ctrazador";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/ptrazador/add", isAuthenticated, renderCtrazadorForm);

router.post("/ptrazador/new-ptrazador", isAuthenticated, createNewCtrazador);

// Get All Notes
router.get("/ptrazadors", isAuthenticated, renderCtrazadors);

// Edit Notes
router.get("/ptrazadors/edit/:id", isAuthenticated, renderEditForm);

router.put("/ptrazadors/edit-ptrazador/:id", isAuthenticated, updateCtrazador);

// Delete Notes
router.delete("/ptrazadors/delete/:id", isAuthenticated, deleteCtrazador);

export default router;
