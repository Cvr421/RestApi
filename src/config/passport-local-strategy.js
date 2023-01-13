step:1; const passport=require('passport');// imporiting the passport module 
const localStrategy=require('passport-local').Strategy;// importing the passport module local strategy
step:2; const User=require('../models/user');// importing the mongodb data base schema to the email of the user
passport.use(new localStrategy({
    usernameField:'email'
},function(email,password,done){
    User.findOne({email:email},function(err,user){
        if(err){
            console.log('Error finding the user');
            return done(err);
        }
        if(!user || user.password !=password){
            console.log('Invalid Password');
            return done(null,false);
        }
        return done(null,user);
    })
}));








//serializeUser determines which data of the user object should be stored in the session. 
//The result of the serializeUser method is attached to the session as req.session.passport.user = {}
passport.serializeUser(function(user,done){
    done(null,user.id);
});
// The first argument of deserializeUser corresponds to the key of the user object that was given to the done function (see 1.).
// So your whole object is retrieved with help of that key. That key here is the user id (key can be any key of the user object i.e. name,email etc). In deserializeUser that key is matched with the in memory array / database or any data resource.

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user');
            return done(err);

        }
        done(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser=function(req,res,next){
    // console.log(req);
    if(req.isAuthenticated()){
        res.locals.user=req.user;
    }
  next();
}

module.exports=passport;

// passport.checkAuthentication=function(req,res,next){
//     if(req.isAuthenticated()){
//         return next();
//     }
// }
// passport.setAuthenticatedUser=function(req,res,next){
//     if(req.isAuthenticated()){
//         req.localStrategy.user=req.user;
//     }
//     next();
// }