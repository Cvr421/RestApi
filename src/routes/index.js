step: 1 ;const express=require('express');//including the express module
step:3; const homecontroller =require('../controllers/homeController');
step:4; const userRouter=require('./users')// here we are importing user_profile
    //    const modifyRouter=require('../controllers/userController')
const tweetRouter=require('./tweet') 
const commetRouter=require('./comment');
step:6; const likeRouter = require('./like');
step: 2 ; const router=express.Router();// then importin router funcitonality from the exprees int variable router
console.log('Router Up!!!');

step:3; router.get('/',homecontroller.root)

step:4; router.use('/users',userRouter) // routing the users_profile on /users
// router.use('/',modifyRouter)
step:5; router.use('/comments',commetRouter);
router.use('/tweets',tweetRouter);
step:6;router.use('/likes', likeRouter);
module.exports=router;


