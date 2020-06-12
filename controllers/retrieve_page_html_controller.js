const router = require("express").Router(),
            request = require("request"),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");
            resultHandler = require("../config/settingMiddleware")

router.get("/retrieve_page_html", require("../config/Auth/authenticate"), (req, res,next) => {
    //REQUIRED
    // url
    //type
    const url = req.query.url;
    const type = req.query.type

    //for external links
    if (type == "external") {
        request(url, (error, response, body) => {
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
                data: response.body,
                code:200                
            }
                
        next()
        })
    } else if (type == "internal") {
        //send a request to /list_pages and get list of pages
        request("http://team-sentry.herokuapp.com/api/list_pages", (error, response, body) => {
            if (error){
                req.result = {
                    status:"fail",
                    error,
                    code:500,
                    message:"Something went wrong!!! : "
                }
                next()             
            }
            
            //Then convert to markdown and send to client
            req.result=  {
                status: "success",
                data: body,
                code:200                
            }
                
        next()
           
    }
        )}
}, resultHandler)
//for handling internal request after user selects page
router.post("/retrieve_page_html:page_id", (req, res,next) => {
    if(mongoose.connection.readyState == 1){
        const page_id = req.params.page_id;
        Data.findById(page_id, (error, page) => {
            
            if (error){
                req.result = {
                    status:"fail",
                    error,
                    code:500,
                    message:"Sorry! That page could not be found: " 
                }
                next()             
            }
            req.result=  {
                status: "success",
                data: page,
                code:200                
            }
                
        next()
        })
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

module.exports = router;