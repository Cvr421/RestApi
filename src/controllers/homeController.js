
// const ejs=require('ejs');
const Tweet = require('../models/tweet');
const User = require('../models/user');
step:1;module.exports.root=function(req,res){
   // return res.render('home',{title:"Twitter"});// here we are sending the respond to the first or called as root in html format 
   
    
    

   
  
    Tweet.find({}).populate('user').exec(function(err,tweets){
        Tweet.find({})
        .populate('user')
        .populate({
            path:'comments',
            populate:{
                path:'user'
            }
        })

        .exec(async function(err, tweets) {
            let fetchedTweets=tweets;
           // console.log(tweets);
           const users = await User.find({});
        //    console.log(users);

            if(err){
                console.log('Error finding tweets');
                fetchedTweets={};
        
            }
          //  return res.render('home',{title:"Twitter",tweets:fetchedTweets});
          return res.render('home', {
            title: "Twitter", 
            tweets: fetchedTweets,
            users: users
        });
         });
      })
      
    
    
     
    
    

}  