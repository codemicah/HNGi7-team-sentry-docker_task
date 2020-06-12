const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");
            resultHandler = require("../config/settingMiddleware")
router.use(require("body-parser").urlencoded({extended:true}))

router.post("/add_page", require("../config/Auth/authenticate"), (req, res,next) => {
   if(mongoose.connection.readyState == 1){
       const title = req.body.title,
           content = req.body.content;
           if(title && content != "" || undefined){
               data = new Data({
                   title: title,
                   content: content
               })
               data.save((error, success) => {
                if (error){
                    req.result = {
                        status:"fail",
                        error,
                        code:500,
                        message:"Something went wrong!!! : "
                    }
                    next()             
                }
                req.result=  {
                    status: "success",
                    data: success,
                    code:200                
                }
                    
            next()
                  
               })
           }else{

            req.result ={
                status: "fail",
                message:"title or body cannot be empty",
                code:400
            }
               next()
           }
   }
   else{
      
       req.result = {
        status:"fail",
        code:503,
        message:"No database connection established" 
    }
       next()
   }
   
},resultHandler)

module.exports = router