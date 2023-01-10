step:1;const exprees=require('express');
step:2;const passport=require('passport');
// const usersController=require('../controllers/userController')
const {profile,signIn,signUp,create,createSession}=require('../controllers/userController')

const router=exprees.Router();


router.get('/profile',profile)
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
module.exports=router;