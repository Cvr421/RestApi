const exprees=require('express');
const passport=require('passport');
const router=exprees.Router();


const {create,destroy}=require('../controllers/commentController');

router.post('/create',passport.checkAuthentication,create);
router.get('/destroy/:id',passport.checkAuthentication,destroy);
module.exports=router;
