import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"

dotenv.config()
connectDB()

const app=express()

app.use(cors()) // Frontend <-> Backend
app.use(express.json()) //understand json data

const PORT=process.env.PORT ||5000

app.get("/",(req,res)=>{
    res.json({message:"YojnaSathi API is running"})
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})