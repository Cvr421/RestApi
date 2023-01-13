step:1;const exprees=require('express');
// const { Passport } = require('passport');
step:2;const passport=require('passport');
const {checkAuthentication}=require('../config/passport-local-strategy')
// const usersController=require('../controllers/userController')
const {profile,
    signIn,
    signUp,
    create,
    createSession,
    destroySession }=require('../controllers/userController')

const router=exprees.Router();


router.get('/profile',checkAuthentication,profile)
router.get('/signup',signUp);
router.get('/signin',signIn);
router.post('/create',create);

step:2;router.post('/create-session',passport.authenticate(
    'local',
    {
        successRedirect:'/',
        failureRedirect:'/signin'
    }
),createSession);

router.get('/signout',destroySession );

module.exports=router;
