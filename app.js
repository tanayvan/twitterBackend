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
app.use("/",(req,res) => {
res.send(`
<!DOCTYPE html>
<html>
  <head>
    <title>Version 1 </title>
  </head>
  <body>
    <h1 style="color: blue;">Hello, World!</h1>
    <p style="font-size: 18px;">This is a demo page with version 1 .</p>
    <img src="https://via.placeholder.com/150" alt="Placeholder Image" style="border: 1px solid black;">
  </body>
</html>
`)
})
app.use('/api',authRoutes)
app.use('/api',userRoutes)


const port=process.env.PORT || 7010
app.listen(port,() => {
    console.log(`Server Started on ${port}`)
})
