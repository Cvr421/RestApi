const Comment=require('../models/comment');
const Tweet=require('../models/tweet');
const {newCommentMailer} = require('../mailers/comments_mailer');

const commentsEmailWorker = require('../workers/commentMailerWorker');
const queue = require('../config/queue');


const create= async function(req,res){
   // console.log(req.body);
   try{
    // const tweet = await  Tweet.findById(req.body.tweet)
    const tweet = await Tweet.findById(req.body.tweet).populate('user');
    console.log(tweet);
 const comment= await   Comment.create({
        content: req.body.content,
        tweet: req.body.tweet,
        user: req.user._id
    });
  tweet.comments.push(comment) ;
  tweet.save();
  newCommentMailer(tweet);

  let job = queue.create('email', tweet).save(function(err) {
    if(err) {
        console.error("********QUEUE ERROR************");
        console.error(err);
        return;
    }
    console.log("Email Enqueued", job.id);
})



  return res.redirect('/') ;
   }catch(err){
    console.error(err);
    return res.redirect('/');
   }
  
      
}

const destroy = async function(req,res){
    try{
 const comment= await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            let tweetId = comment.tweets;
            comment.remove();
            Tweet.findByIdAndUpdate(tweetId,{$pull :{comments:req.params.id}},function(err,tweet){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back')
        }
    }
    catch(err){
        console.error(err);
        return;
    }

   
}
module.exports={create,destroy};