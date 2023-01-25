const Like = require('../models/like');
const Comment = require('../models/comment');
const Tweet = require('../models/tweet');

const toggleLike =async function(req, res) {
    // /likes/toggle?id=dcsc&type=Tweet
    try {
        let likeable;// likes store
        let deleted = false;// deteling the likes

        if(req.query.type == 'Tweet') {
            likeable = await Tweet.findById(req.query.id).populate('likes');
        } else if(req.query.type == 'Comment') {
            likeable = await Comment.findById(req.query.id).populate('likes');
        } else {
            return res.json(404);
        }
     // checking that if likes is present or not
        let exists = await Like.findOne({
            likeable: req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        if(exists) {
            likeable.likes.pull(exists._id);
            likeable.save();
            exists.remove();
            deleted = true;
        } else {// if likes is not present then we are making new likes

            let newLikeObject = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });
            likeable.likes.push(newLikeObject);// we are pushing the new likes into the likes array
            likeable.save();
        }
      // here we are sending the success message to forntend
        return res.json(200, {
            message: 'Success in like',
            data: {
                deleted: deleted
            }
        })

    } catch(err) {
        console.error(err);
        return res.json(500);
    }
}

module.exports = {toggleLike};