/**
 * @namespace retrieve_page_html
 * 
 * @file 
 * 
 * Returns the html content of a specified webpage;
 * if the request is an internal request, it returns the HTML markup from
 * the database. if it is an external request it returns the HTML markup
 * from the url specified. 
 */


 /**
  * @method
  * 
  * Uses GET requests to extract the HTML markup from a 
  * webpage stored in the DB(internal request) or an external
  * webpage (accessed via URL)
  * 
  * @param {URL} url The url or page id of the page to be retrieved
  * 
  * @param {String} type The type of request to be made i.e internal(stored in 
  * the database) or external(not in the database).
  */

const router = require("express").Router(),
            request = require("request"),
            Data = require("../Resources/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");


router.get("/retrieve_page_html", (req, res) => {
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