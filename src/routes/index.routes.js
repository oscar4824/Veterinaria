import { Router } from "express";
import { renderIndex, renderAbout, renderAdmin } from "../controllers/index.controller";
import { isAuthenticated } from "../helpers/auth";

const router = Router();

router.get("/", renderIndex);
router.get("/about", renderAbout);
router.get("/admin", isAuthenticated, renderAdmin);

export default router;
