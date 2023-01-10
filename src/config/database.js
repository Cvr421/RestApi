const mongoose=require('mongoose');
const connect=()=>{
    console.log("Mongodb connected!");
    return mongoose.connect('mongodb://localhost/twitter_dev2');
}
module.exports=connect;