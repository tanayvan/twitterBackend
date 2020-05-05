var mongoose = require('mongoose')
var uuid=require("uuid/v1")
var crypto =  require('crypto')
const {ObjectId}= mongoose.Schema

var userSchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:{
        type:String
    },
    
    username:{
        type:String,
        unique:true,
        required:true
    },
    following:{
        type:[String]
    },
    followers:{
        type:[String]
    }
    
    
    
},{timestamps:true}
)

userSchema.virtual("password")
.set(function(password){
    this._password=password 
    this.salt=uuid()
    this.encry_password=this.securePassword(password)

}).get(function(){
    return this._password
})


userSchema.methods ={
    authenticate:function(plainPassword){
        return this.securePassword(plainPassword)=== this.encry_password
    },
    securePassword(plainPassword){
        if(!plainPassword) return "";
        try{
            return crypto
        .createHmac("sha256", this.salt)
        .update(plainPassword)
        .digest("hex");
        }
        catch(err)
        {
            return ""
        }
    }
}

module.exports=mongoose.model("User",userSchema)