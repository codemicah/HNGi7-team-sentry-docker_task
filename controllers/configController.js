const router = require("express").Router(),
            request = require("request"),           
            Config = require("../config/config"),
            mongoose = require("mongoose");
            User = require("../models/users"),
            xml = require("xml")
            resultHandler = require("../config/settingMiddleware")
            


router.get("/configure",require("../config/Auth/authenticate"),(req,res,next)=>{
     const format = req.body.format
     const id = req.query.id
 if(mongoose.connection.readyState == 1){
      if(['JSON',"XML"].includes(format.toUpperCase())){
         User.findByIdAndUpdate({account_id:id},{setting:{dataFormat:format.toUpperCase()}},{ new: true }).then(result=>{

            req.format =result.settings.dataFormat          

            req.result=  {
                status: "success",
                data: val,
                code:200                
            }               
            next()
        

         }).catch(err=>{

            req.result = {
                status:"fail",
                err,
                code:500,
                message:"Cannot update you setting"
            }
            next()

         })
     
      }else{
        req.result = {
            status:"fail",
            err,
            code:400,
            message:"field should be in the supported format"
        }
          next()
      }
   }
   else{
       res.status(503).json({
           status: "No database connection established"
       })
   }
},resultHandler)