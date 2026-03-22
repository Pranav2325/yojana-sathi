import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getProfile, getSavedSchemes, saveScheme, updateProfile } from "../controllers/userController.js"

const router=express.Router()

router.get('/profile',protect,getProfile)
router.put('/profile',protect,updateProfile)
router.put('/save/:schemeId',protect,saveScheme)
router.get('/saved',protect,getSavedSchemes)

export default router