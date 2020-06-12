const mongoose = require("mongoose");

//This connects to local mongodb
//In order to use online, get a mogodb url from mlab and replace here
const config = mongoose.connect("mongodb://heroku_84w9wpv6:jntrjeh9mhfolt4pb5h0smgb2k@ds145118.mlab.com:45118/heroku_84w9wpv6", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, success)=>{
    if(err){
        console.log("Could not connect to database")
    }else{
    console.log("connected database")
}
});

module.exports = config;
