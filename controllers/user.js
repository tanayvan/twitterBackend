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
        user:req.profile,name:req.profile.name})
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


//Add and Remove From Following Tab
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
           


//Get Users For Discover People Tabs
  exports.getAllUser = (req,res) => {
    User.find().limit(10).exec((error,user) => {
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

  //Add And Remove From Followers Tab
  exports.followedByTheUser = (req,res) => {
    User.findOneAndUpdate({username:req.profile.username},{
        $addToSet:{followers:req.body.followerUsername}},
        { new: true, upsert: true },
        (err,user) => {
            if (err) {
                return res.status(400).json(err);
              }
              return res.status(201).json(user);
        }
    )
}

exports.unFollowedByTheUser = (req,res) => {
    User.findOneAndUpdate({username:req.profile.username},{
        $pull:{followers:req.body.unFollowerUsername}},
        { new: true, upsert: true },
        (err,user) => {
            if (err) {
                return res.status(400).json(err);
              }
              return res.status(201).json(user);
        }
    )
}

// get Tweets of the Following Users

exports.getTweetsForFeed = (req,res) => {
    var user1=[]
    User.findOne({username:req.profile.username})
    .exec((error,user) => {
        
        if(error){
            return res.status(400).json(err);
            
        }
       user.following.map((user,index) =>{ 
           
            
            user1.push(user)   
       })
       Tweet.find({ ["user.username"]: { $in: user1 }}).populate("User").exec((err, Tweet) => {
        if (err) return console.log(err);
    
        // note: you must wait till the callback is called to send back your response
        res.json({ tweet: Tweet });
    });
       
    })
   
        
}