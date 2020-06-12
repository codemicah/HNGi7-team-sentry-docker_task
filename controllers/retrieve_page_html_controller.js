const router = require("express").Router(),
            request = require("request"),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");

router.get("/retrieve_page_html", require("../config/Auth/authenticate"), (req, res) => {
    //REQUIRED
    // url
    //type
    const url = req.query.url;
    const type = req.query.type

    //for external links
    if (type == "external") {
        request(url, (error, response, body) => {
            if (error)
                res.send("Something went wrong!!! : " + error)
            res.status(200).json({
                status: "success",
                data: response.body
            })
        })
    } else if (type == "internal") {
        //send a request to /list_pages and get list of pages
        request("http://team-sentry.herokuapp.com/api/list_pages", (error, response, body) => {
            if (error)
                res.send(error)
            //Then convert to markdown and send to client
            res.json({
                body
        })
    }
        )}
})
//for handling internal request after user selects page
router.post("/retrieve_page_html:page_id", (req, res) => {
    if(mongoose.connection.readyState == 1){
        const page_id = req.params.page_id;
        Data.findById(page_id, (err, page) => {
            if (err)
                res.send("Sorry! That page could not be found: " + err);
            res.status(200).json({
                page
            });
        })
    }
   else{
        res.status(503).json({
            status: "No database connection established"
        })
   }
})

module.exports = router;