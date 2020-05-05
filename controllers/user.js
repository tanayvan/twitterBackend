const User =  require('../models/user')
const Tweet = require('../models/tweets')
var ObjectId = require('mongodb').ObjectId; 

 
exports.getUserByUserName = (req,res,next,userName) =>{
    User.findOne({username:userName}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB "+err
            })
    }

    req.profile=user
    
    
  
    next()
    })

}
exports.getFollowedUserByUserName = (req,res,next,userName) =>{
    User.findOne({username:userName}).exec((err,user) => {
        if(err || !user){
            return res.status(400).json({
                error:"No user was found in DB"+err
            })
    }

    req.Fprofile=user
    console.log(req.Fprofile)
    
  
    next()
    })

}

exports.getUser = (req,res) => {
    
        req.profile.salt=undefined
        req.profile.encry_password=undefined
        return res.json(req.profile)
}


exports.makeATweet=(req,res)=>{
        const tweet = new Tweet({tweet:req.body.tweets,
        user:req.profile})
        tweet.save((err,tweet) => {
            if(err){
                return(
                    res.status(400).json({
                        error:"Not Able to Post Tweet"+err
                    })
                    )
            }
            res.json({tweet})
        })
}

 exports.getAllTweets = (req,res) => {
        console.log("Tweet Request")
     Tweet.find({["user.username"]:req.profile.username})
     .exec((error,tweets) => {
        if(error){
            return(
                res.status(400).json({
                    error:"Trouble getting Tweets "+error
                })
                )
        }
        res.json({tweets})
     })
}



exports.followRequest = (req,res) => {
    
        const user= {
            user:req.Fprofile.username
        }
        User.findByIdAndUpdate(req.profile._id,{$push:{following:user}}, { "new": true, "upsert": true ,useFindAndModify:false},
        function (err, user) {
            if (err) console.log(err)
            console.log(user);
        })
}
            
  
