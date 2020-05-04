const express=require('express')
const router=express.Router()
const {check} = require('express-validator')
const {signUp,signIn,signout} = require('../controllers/auth')


router.post('/signup',[
    check("name","name should be atleast 3 character").isLength({min:3}),
    check("email","email is required").isEmail(),
    check("password","password should be atleast 6 character").isLength({min:6})
],signUp)


router.post('/signin',[
    check("email","email is required").isEmail(),
    check("password","password should be atleast 6 character").isLength({min:6})
],signIn)


router.get('/signout',signout)

module.exports=router
