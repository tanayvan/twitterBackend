const express = require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')

const app=express()

//middlewares
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())

//my Routes
const authRoutes=require('./routes/auth')
const userRoutes= require('./routes/user')
//DataBAse Connection
mongoose.connect("mongodb://localhost:27017/Twitter20",{useNewUrlParser:true,useUnifiedTopology: true ,useCreateIndex:true})
.then(()=>{
    console.log("Database Connected")
}).catch(()=>{
    console.log("Error Connecting to Database")
})


//Set Routes
app.use('/api',authRoutes)
app.use('/api',userRoutes)


const port=7000 || process.env.PORT
app.listen(port,() => {
    console.log(`Server Started on ${port}`)
})