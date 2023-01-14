const exprees=require('express');
const passport=require('passport');
const router=exprees.Router();


const {create}=require('../controllers/commentController');

router.post('/create',passport.checkAuthentication,create);
module.exports=router;