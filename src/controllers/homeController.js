
// const ejs=require('ejs');
const Tweet = require('../models/tweet');
const User = require('../models/user');
step:1;module.exports.root= async function(req,res){
   // return res.render('home',{title:"Twitter"});// here we are sending the respond to the first or called as root in html format 
   try{
    const tweets=await  Tweet.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    }).sort({"createdAt":-1}).exec();// sorting the tweet on the bases of created time in decending order
    
    // console.log(tweets);
    let fetchedTweets=tweets;
       const users = await User.find({});
    //    console.log(users);

     
      //  return res.render('home',{title:"Twitter",tweets:fetchedTweets});
      return res.render('home', {
        title: "Twitter", 
        tweets: fetchedTweets,
        users: users
    });
    
   }catch(err){
       console.error(err);
       return;


   }
  
      
    }   
    
    
     
    
    
