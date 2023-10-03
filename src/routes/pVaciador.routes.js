import { Router } from "express";
import {
  renderCvaciadorForm,
  createNewCvaciador,
  renderCvaciadors,
  renderEditForm,
  updateCvaciador,
  deleteCvaciador,
} from "../controllers/Cvaciador";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/pvaciador/add", isAuthenticated, renderCvaciadorForm);

router.post("/pvaciador/new-pvaciador", isAuthenticated, createNewCvaciador);

// Get All Notes
router.get("/pvaciadors", isAuthenticated, renderCvaciadors);

// Edit Notes
router.get("/pvaciadors/edit/:id", isAuthenticated, renderEditForm);

router.put("/pvaciadors/edit-pvaciador/:id", isAuthenticated, updateCvaciador);

// Delete Notes
router.delete("/pvaciadors/delete/:id", isAuthenticated, deleteCvaciador);

export default router;
