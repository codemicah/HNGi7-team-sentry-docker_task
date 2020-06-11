/**
 * @namespace set_page_markdown
 * 
 * @file
 * 
 * This controller uses a GET request to retrieve an already stored webpage from the 
 * database or an external one (as the case may be) and sends the HTML markup to the client;
 * After the client is done with editing the markup, it is 
 * sent back to the database through a POST request to be saved.
 */

 /**
  * @method 
  * 
  * Sends a GET request to the webpage; internal(to the database), external(to the URL) and 
  * retrieves the markup from the webpage, after editing a POST request is 
  * made to send it to the database for saving
  * 
  * @param {String} type The type of GET request to extract webpage markup
  * 
  * @param {URL} url The url or page id of the page to be extracted and edited
  */

const router = require("express").Router(),
            showdown = require("showdown"),
            request = require("request"),
            turndown = require("turndown"),
            Data = require("../Resources/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose");


const converter = new turndown();
const showDown = new showdown.Converter();
//first get the requested page 
router.get("/set_page_markdown", (req, res) => {
    //url for requests on external links
    const page = req.query.type;
    if (page == "external") {
        const url = req.query.url
        request(url, (error, response, body) => {
            if (error)
                res.send("Something went wrong!!!" + error);
            // convert HTML to Markdown
            const markdown = converter.turndown(body);
            res.status(200).json({status: "success", data: markdown});
        })
    } else if (page == "internal") {
            console.log("received >>>")
        request("http://team-sentry.herokuapp.com/api/list_pages", (error, response, body) => {
            if (error)
                res.send(error)
            //Send back list of pages for user to pick and set markdown 
            res.status(200).json({status: "success", data: JSON.parse(body)})
        })
    }
})

//for finding the required page by _id and sending back to user
router.post("/set_page_markdown:page_id", (req, res) => {
    if(mongoose.connection.readyState == 1){
        const page_id = req.params.page_id;
        Data.findById(page_id, (err, page) => {
            if (err)
                res.send("Sorry! That page could not be found: " + err);
            //Then convert to markdown and send to client
            const markdown = converter.turndown(page);
            res.send(markdown);
        })
    }
    else{
        res.status(503).json({
            status: "No database connection established"
        })
    }
})


router.post("/set_page_markdown", (req, res) => {
    //Get markdown from client, convert 
    const title = req.body.title;
    const markdown = req.body.markdown;
    console.log(title, markdown)
    //convert to html and save in database
    const htmlTitle = showDown.makeHtml(title),
                html = showDown.makeHtml(markdown);
    console.log(html, htmlTitle)

    const htmlData = new Data({
        title: htmlTitle,
        content: html
    })
    if(mongoose.connection.readyState == 1){
        Data.create(htmlData, (err, success) => {
            if (err)
                res.send(err);
            res.send("<h2>Markdown saved successfully</h2>" + "<br>" + success)
        });
    }
     res.status(503).json({
         status: "No database connection established"
     })
})

module.exports = router;