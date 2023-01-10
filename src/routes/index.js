step: 1 ;const express=require('express');//including the express module
step:3; const homecontroller =require('../controllers/homeController');
step:4; const userRouter=require('./users')// here we are importing user_profile
    //    const modifyRouter=require('../controllers/userController')
step: 2 ; const router=express.Router();// then importin router funcitonality from the exprees int variable router
console.log('Router Up!!!');

step:3; router.get('/',homecontroller.root)
step:4; router.use('/users',userRouter)  // routing the users_profile on /users
// router.use('/',modifyRouter)

module.exports=router;