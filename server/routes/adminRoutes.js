import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  addScheme,
  deleteScheme,
  toggleScheme,
} from "../controllers/adminController.js";
const router = express.Router();

router.post("/schemes", protect, adminOnly, addScheme);
router.delete("/schemes/:id", protect, adminOnly, deleteScheme);
router.put("/schemes/:id/toggle", protect, adminOnly, toggleScheme);
