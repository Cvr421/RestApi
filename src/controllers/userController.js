

const User = require("../models/user");


const profile=function(req,res){
   // res.render('users/user_profile',{layout: __dirname+'/../../src/views/layouts/user_profile'})// this location of the file show the different layout that importing from the layouts files
// here render funtion read the actuall html file from other location
  User.findById(req.params.id, function(err, user) {
    if(!user) {
        return res.redirect('/');
    }
    return res.render('users/user_profile', {
        title: 'User Profile',
        profile_user: user
    });
})
}
const signUp=function(req,res){// after this we are going to route this in routes/users.js file
  step:2;  if(req.isAuthenticated()){//here we telling that if the user is signin or authenticated then no need to go to singnin or signUp page directly redirect to profile page
    return res.redirect('/users/profile');
  }
    return res.render('users/user_sign_up',{
        title:'Twitter | Sign  Up'
    });
}

const signIn=function(req,res){
    step:2;  if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('users/user_sign_in',{
        title:'Twitter | Sign In'
    });
}
  
const create=function(req,res){// here we are requesting the post request to get the req.body user information
   console.log(req.body);
//    return res.status(200).end();
    // writing the user authentication logic
    // ****************IMPORTANT*******************
    // CREATING USER IN THE MONGODB DATA BASE
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){
            console.error(err);
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.error(err);
                    return;

                }
                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('/users/signin');
        }
    })
}



const update = function(req, res) {
    if(req.user.id == req.params.id) {
        User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
            if(err) {
                console.log('Error updating user');
                return res.redirect('/');
            }
            return res.redirect('back');
        })
    } else {
        return res.status(401).isAuthenticated('Unauthorised');
    }
}




const createSession=function(req,res){// here we are creating the session 
    // return res.status(200).end();
    return res.redirect('/');
}
const destroySession = function(req,res){
    req.logout(function(err){
        if(err){return next(err);}
        return res.redirect('/');
    });
}

module.exports={
    profile,
    signIn,
    signUp,
    create,
    update,
    createSession,
    destroySession 
}

