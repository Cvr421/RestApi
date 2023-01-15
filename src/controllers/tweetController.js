const Tweet =require('../models/tweet');
const create=function(req,res){
Tweet.create({
        content: req.body.content,// we are actually storing into the mongodb database as this parameter
        user: req.user._id
    },function(err,tweet){
        if(err){
            console.error("Error in creating tweet")
            return;
        }
        return res.redirect('back');
    })

   
}
module.exports={create};  


      