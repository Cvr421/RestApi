
// const ejs=require('ejs');
const Tweet = require('../models/tweet');
step:1;module.exports.root=function(req,res){
   // return res.render('home',{title:"Twitter"});// here we are sending the respond to the first or called as root in html format 
  
    Tweet.find({}).populate('user').exec(function(err,tweets) {
        let fetchedTweets=tweets;
       // console.log(tweets);
        if(err){
            console.log('Error finding tweets');
            fetchedTweets={};
    
        }
        return res.render('home',{title:"Twitter",tweets:fetchedTweets});
     });
    
    

}  