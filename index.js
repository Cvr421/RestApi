step: 1//Iniliazing the express
const express=require('express')//In NodeJS, require() is a built-in function to include external modules that exist in separate files. require() statement basically reads a JavaScript file, executes it, and then proceeds to return the export object.
step:4 ; const router=require('./src/routes/index');

step:11;const {json,urlencoded}=require('body-parser');
step:10; const connect=require('./src/config/database');
step:8;var expressLayouts=require('express-ejs-layouts'); // here we are installing the custom layout in expres js
step:12;const session=require('express-session');
step:12;const passport=require('passport');
// step:12;const passportlocal=require('./src/config/passport-local-strategy');


// step:12; const cors=require('cors');
const app_express=express(); //refereing the express js to app variale

step:11;app_express.use(json());
step:11;app_express.use(urlencoded({extended:true}));
// step:12;app_express.use(cors);

// const { param } = require('./src/routes/index');

step:9;app_express.use(express.static(__dirname+'/src/assets'));// here we are using the css file
step : 2// installing the nodemon (that will monitor for any changes in your source and automatically restart your server. Perfect for development.)
step: 3 // creating src file in that crating the controllers , models and views
 // here we are includeing the router func from src router file
 step:9;app_express.set('layout extractStyles',true);
 step:9;app_express.set('layout extractScripts',true);

step:8;    app_express.use(expressLayouts);// using the custom the layout
step:8; app_express.set('layout',__dirname+'/src/views/layouts/layout');
step:6 // making the homecontroller in src controller
step:7; // instialling the ejs mudule to write the hmtl code in the form of javascript and configuring in the src/controller/homecontroller

step:7; app_express.set('view engine','ejs');//configuring the ejs module
step:7;app_express.set('views','./src/views');// congfiguring the views file 



step:12; app_express.use(session({
    name:'twitter',
    secret:'ChandravijayUnacademy',
    resave:false,
    cookie:{
        maxAge:6000000
    }
}))


step:12;app_express.use(passport.initialize());
step:12;app_express.use(passport.session());
step:13;app_express.use(passport.setAuthenticatedUser);

step:5; app_express.use('/',router);
step:1;app_express.listen(3000,async()=>{//here we are startig the express applicaiton to the server 3000
    step:10 ; await connect();
    console.log("Server started at 3000!!!")
});