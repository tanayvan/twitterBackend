const express= require('express')
const router = express.Router()
const {isSignedIn} = require('../controllers/auth')
const {getUser,getUserByUserName,makeATweet,getAllTweets,followRequest,getFollowedUserByUserName} = require('../controllers/user')




router.param("userName",getUserByUserName)
router.param("FuserName",getFollowedUserByUserName)

router.get('/:userName/follow/:FuserName',followRequest)
router.get('/:userName',getUser)
router.get('/tweets/:userName',getAllTweets)
router.post('/:userName',isSignedIn,makeATweet)



module.exports=router