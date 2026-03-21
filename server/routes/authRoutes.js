import express from 'express'
import { loginUser, registerUser } from '../controllers/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router=express.Router()
router.post('/register',registerUser)
router.post('/login',loginUser)
router.put('/update-profile',protect,async(req,res)=>{
    try {
        const user=await User.findByIdAndUpdate(
            req.user._id,
            {profile:req.body},
            {new:true}
        )
        res.json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export default router