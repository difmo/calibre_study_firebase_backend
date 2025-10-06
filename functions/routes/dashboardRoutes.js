import express from "express";
import { getData, addData, updateData, deleteData } from "../controllers/dashboardController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protect all dashboard routes with token middleware
router.use(verifyToken);

router.get("/", getData);
router.post("/", addData);
router.put("/", updateData);
router.delete("/", deleteData);

export default router;
