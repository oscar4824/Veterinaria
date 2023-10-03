import { Router } from "express";
import {
  renderCrelleForm,
  createNewCrelle,
  renderCrelle,
  renderEditForm,
  updateCrelle,
  deleteCrelle,
} from "../controllers/Crelle";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/prelle/add", isAuthenticated, renderCrelleForm);

router.post("/prelle/new-prelle", isAuthenticated, createNewCrelle);

// Get All Notes
router.get("/prelles", isAuthenticated, renderCrelle);

// Edit Notes
router.get("/prelle/edit/:id", isAuthenticated, renderEditForm);

router.put("/prelle/edit-prelle/:id", isAuthenticated, updateCrelle);

// Delete Notes
router.delete("/prelle/delete/:id", isAuthenticated, deleteCrelle);

export default router;
