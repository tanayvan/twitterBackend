const express= require('express')
const router = express.Router()
const {isSignedIn} = require('../controllers/auth')
const {getUser,getUserByUserName,makeATweet,getAllTweets,followTheUser,unFollowTheUser,getAllUser} = require('../controllers/user')




router.param("userName",getUserByUserName)


router.get('/getalluser',getAllUser)
router.get('/:userName',getUser)
router.get('/tweets/:userName',getAllTweets)
router.post('/:userName',isSignedIn,makeATweet)
router.patch('/:userName',isSignedIn,followTheUser)
router.patch('/unfollow/:userName',isSignedIn,unFollowTheUser)


module.exports=router