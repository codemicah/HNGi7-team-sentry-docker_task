const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose"),
            config = require("../config/config"),
            resultHandler = require("../config/settingMiddleware")
           


// request = require("request"),
// mongoose = require("mongoose");
router.get("/list_pages", require("../config/Auth/authenticate"), (req, res,next) => {
    if(mongoose.connection.readyState == 1){
        // const url = req.body.url;
        Data.find({}, (err, pages) => {
            if (err){
                req.result = {
                    status:"fail",
                    err,
                    code:500
                }
                next()
            }
            req.result = {
                status:"success",
                data:{pages},
                code:200
            }
            // res.json(pages)
            next()
        })
    }
    else{
        const result = {
            status: "failed",
            message: "No database connection established",
            code:503,          
        }
        req.result = result
        next()
       
    }
},resultHandler)

module.exports = router;