const User = require('../models/user')
const {check,validationResult} = require('express-validator')
const jwt= require('jsonwebtoken')
const expressJwt= require('express-jwt')

exports.signUp = (req,res) =>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    const user=new User(req.body)

    user.save((err,user) =>{
        if(err)
        {  
            return res.status(400).json({
                error:"Email Or Username Already Exists"+err
            })
        }
        res.json({
            name: user.name,
            email: user.email,
            id: user._id,
            username:user.username
        })
    })
}


exports.signIn = (req,res) => {
    const errors = validationResult(req)
    const {email,password}= req.body

    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    User.findOne({email},(err,user)=>{
        if(err || !user){

            return res.status(400).json({
                error:"User email does not exist"
            })
        }

        if(!user.authenticate(password)){

            return res.status(401).json({
                 error:"Email And password do not Match"
             })
         }
          //Create Token
          const token=jwt.sign({_id:user._id},"tanayvan")


          //put token in cookie
          res.cookie("token",token,{expire:new Date()+9999})
          res.cookie("profile",req.profile,{expire:new Date()+9999})
            
          //send response to front End
          const  {_id,name,email,role,username} =user
          return res.json({token,user:{_id,name,email,role,username }})



    })
    
}


exports.signout=(req,res)=>{
    res.clearCookie("token")
    res.json({
        message:"User Signout SuccessFully"
    })
  
  
  }

  //protected Routes

  exports.isSignedIn= expressJwt({
      secret:"tanayvan",
      userProperty:"auth"
  })

  exports.isAuthenticated =(req,res,next)=>{
   
    let checker= req.profile && req.auth &&  req.profile._id==req.auth._id  
   
    if(!checker){
        return res.status(403).json({
            error:"Access Denied Bro", 
        })
    }

    next()
}
exports.isAdmin =(req,res,next)=>{
    
    if(req.profile.role===0){
        return res.status(403).json({
            error:"You are not admin,fuck off bitch"
        })
    }

    next()
}