const router = require("express").Router(),
            request = require("request"),
            
            Config = require("../config/config"),
            mongoose = require("mongoose");
            User = require("../models/users"),
            xml = require("xml")
            


router.get("/configure",(req,res)=>{
     const format = req.body.format
     const id = req.account_id
 if(mongoose.connection.readyState == 1){
      if(['JSON',"XML"].includes(format.toUpperCase())){
         User.findByIdAndUpdate(id,{setting:{dataFormat:format}},{ new: true }).then(result=>{

            const val = {
                status:"success",
                data:{
                    result
                }
            }
            if(result.settings.dataFormat==="XML"){
                
                let xmlString = xml(val);
                res.type('application/xml');
               return res.status(200).send(xmlString)
            }

         return res.status(200).send(val)

         }).catch(err=>{
            res.status(500).send({
                status:"fail",
                message:"Cannot update you setting"
            })

         })
     
      }else{
          res.status(400).send({
              status:"fail",
              message:"field should be in the supported format"
          })
      }
   }
   else{
       res.status(503).json({
           status: "No database connection established"
       })
   }
})