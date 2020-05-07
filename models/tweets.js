const mongoose= require('mongoose')
const {ObjectId}= mongoose.Schema
var tweetSchema = new mongoose.Schema({
    tweet:{
        type:String
    },
    user:{
        _id:{
            type:ObjectId,
             ref:"User"
          
        },
        username:{
            type:String,
        
        },
        name:{
            type:String
        }
    }
})

module.exports=mongoose.model("Tweet",tweetSchema)