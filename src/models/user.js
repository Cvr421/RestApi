step:1;const mongoose=require('mongoose'); // including mongose 
const userSchema=new mongoose.Schema({// Making user model for database
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
   




},{timestamps:true});
const User=mongoose.model('User',userSchema);
module.exports=User;