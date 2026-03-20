import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js'
import { protect } from "./middleware/authMiddleware.js"

dotenv.config()
connectDB()

const app=express()

app.use(cors()) // Frontend <-> Backend
app.use(express.json()) //understand json data
app.use('/api/auth',authRoutes)

const PORT=process.env.PORT ||5000

app.get("/",(req,res)=>{
    res.json({message:"YojnaSathi API is running"})
})

app.get('/api/protected',protect,(req,res)=>{
    res.json({
        message:'You are logged in',
        user:req.user
    })
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})