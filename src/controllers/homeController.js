
const ejs=require('ejs');
step:1;module.exports.root=function(req,res){
    return res.render('home',{title:"Twitter"});// here we are sending the respond to the first or called as root in html format 

}  