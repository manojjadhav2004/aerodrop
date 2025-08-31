import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/userRoute.js'
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'
dotenv.config();

// app config
const app = express()
const port = process.env.PORT || 4000

//middle ware
app.use(express.json())
app.use(cors());


//db connextion
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use('/images',express.static('uploads'))
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use("/api/order", orderRouter)

app.get('/',(request,response)=>{
    response.send("API working")
})

app.listen(port,()=>{
    console.log(`Server is running ${port}`)
})

//mongodb+srv://jahnavi22bec7306:c5HVIF0RJVhovJjP@cluster-1.sk8ttvt.mongodb.net/?
//mongodb+srv://rameshoffset2005:rameshoffset@cluster0.urwfqaa.mongodb.net/?
