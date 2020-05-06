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
    //Just A Comment
    
  
    next()
    })

}


exports.getUser = (req,res) => {
    
        req.profile.salt=undefined
        req.profile.encry_password=undefined
        return res.json(req.profile)
}


exports.makeATweet=(req,res)=>{
        const tweet = new Tweet({tweet:req.body.tweet,
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



exports.followTheUser = (req,res) => {
    User.findOneAndUpdate({username:req.profile.username},{
        $addToSet:{following:req.body.followerUsername}},
        { new: true, upsert: true },
        (err,user) => {
            if (err) {
                return res.status(400).json(err);
              }
              return res.status(201).json(user);
        }
    )
}
exports.unFollowTheUser = (req,res) => {
    User.findOneAndUpdate({username:req.profile.username},{
        $pull:{following:req.body.unFollowerUsername}},
        { new: true, upsert: true },
        (err,user) => {
            if (err) {
                return res.status(400).json(err);
              }
              return res.status(201).json(user);
        }
    )
}
            
  exports.getAllUser = (req,res) => {
    User.find().limit(6).exec((error,user) => {
        if (error) {
            return res.status(400).json(error);
          }
          user.forEach((user,index) => {
              user.salt=undefined
              user.encry_password=undefined
          })
          return res.status(201).json(user);
    })
  }
