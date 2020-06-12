const User = require("../models/users");
exports.settingsMiddleware = (req,res,next)=>{
    const {id} =  req.params
    User.find({account_id:id}).then(user=>{
        if(!user){
           return res.status(404).send({
                status:"fail",
                message:"Account not found"
            })
        }
 
 
        req.settings = user.settings.dataFormat
        next()
    }).catch(err=>{
      return  res.status(500).send({
            status:"fail",
            message:"Server Error"
        })
    })
 
 }