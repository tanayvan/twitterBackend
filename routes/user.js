const express= require('express')
const router = express.Router()
const {isSignedIn} = require('../controllers/auth')
const {getUser,getUserByUserName,makeATweet,getAllTweets,followTheUser,unFollowTheUser,getAllUser,followedByTheUser,unFollowedByTheUser,getTweetsForFeed} = require('../controllers/user')




router.param("userName",getUserByUserName)


router.get('/getalluser',getAllUser)
router.get('/:userName',getUser)
router.get('/tweets/:userName',getAllTweets)
router.get('/feed/:userName',getTweetsForFeed)
router.post('/:userName',isSignedIn,makeATweet)
router.put('/follower/:userName',isSignedIn,followedByTheUser)
router.put('/unfollower/:userName',isSignedIn,unFollowedByTheUser)
router.patch('/:userName',isSignedIn,followTheUser)
router.patch('/unfollowing/:userName',isSignedIn,unFollowTheUser)


module.exports=router