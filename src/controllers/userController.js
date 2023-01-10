

const User = require("../models/user");


const profile=function(req,res){
    res.render('users/user_profile',{layout: __dirname+'/../../src/views/layouts/user_profile'})// this location of the file show the different layout that importing from the layouts files
// here render funtion read the actuall html file from other location

}
const signUp=function(req,res){// after this we are going to route this in routes/users.js file
    return res.render('users/user_sign_up',{
        title:'Twitter | Sign  Up'
    });
}

const signIn=function(req,res){
    return res.render('users/user_sign_in',{
        title:'Twitter | Sign In'
    });
}
  
const create=function(req,res){// here we are requesting the post request to get the req.body user information
//    console.log(req.body);
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
const createSession=function(req,res){// here we are creating the session 
    return res.status(200).end();
}

module.exports={
    profile,
    signIn,
    signUp,
    create,
    createSession

}

