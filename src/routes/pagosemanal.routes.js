import { Router } from "express";
import {
  renderPagosemanalForm,
  renderPagosemanalpForm,
  renderPagosemanaltForm,
  renderPagosemanalrForm,
  createNewPagosemanal,
  renderPagosSemanals,
  renderEditForm,
  renderEditFormp,
  renderEditFormt,
  renderEditFormr,
  updatePagoSemanal,
  deletePagoSemanal,
  generatePDF,
  mergePDFs,
  fusionPDFs
  // obtenerDocumentosPDF
} from "../controllers/pagosemanal.controller";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

// New Note
router.get("/pasing/add/:id", isAuthenticated, renderPagosemanalForm);
router.get("/pasingp/add/:id", isAuthenticated, renderPagosemanalpForm);
router.get("/pasingt/add/:id", isAuthenticated, renderPagosemanaltForm);
router.get("/pasingr/add/:id", isAuthenticated, renderPagosemanalrForm);
router.post("/pasing/new-pasing", isAuthenticated, createNewPagosemanal);

// Get All Notes
router.get("/pasings", isAuthenticated, renderPagosSemanals);
router.get("/pasings/generatePDF/:id", isAuthenticated, generatePDF);
router.get("/pasings/mergePDFs", isAuthenticated, mergePDFs);
router.get("/pasings/fusionPDFs/:id", isAuthenticated, fusionPDFs);

// router.get("/pasings/obtenerDocumentosPDF/:id", isAuthenticated, obtenerDocumentosPDF);

// Edit Notes
router.get("/pasings/edit/:id", isAuthenticated, renderEditForm);
router.get("/pasings/editp/:id", isAuthenticated, renderEditFormp);
router.get("/pasings/editt/:id", isAuthenticated, renderEditFormt);
router.get("/pasings/editr/:id", isAuthenticated, renderEditFormr);

router.put("/pasings/edit-pasing/:id", isAuthenticated, updatePagoSemanal);

// Delete Notes
router.delete("/pasigns/delete/:id", isAuthenticated, deletePagoSemanal);

export default router;
