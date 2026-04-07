import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getAllSchemes,
  getMatchedSchemes,
  getSchemeById,
} from "../controllers/schemeController.js";
import Scheme from "../models/Scheme.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/matched", protect, getMatchedSchemes);
router.get("/", getAllSchemes);
router.get("/:id", protect, getSchemeById);
router.post("/", protect, async (req, res) => {
  try {
    const scheme = await Scheme.create(req.body);
    res.status(201).json(scheme);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});



export default router;
