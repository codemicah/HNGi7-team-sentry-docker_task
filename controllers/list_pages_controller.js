/**
 * @file
 * 
 * This controller retrieves a list of all pages stored 
 * within the data base through a GET request.
 */


 /**
  * @constructor 
  * 
  * Sends a GET request to  the database and retrieves 
  * all the pages in the database
  * 
  * @returns
  * 
  * JSON object containing the details of each webpage
  */


const router = require("express").Router(),
            Data = require("../Resources/database/database"),
            mongoose = require("mongoose"),
            config = require("../config/config");

// if the '/list_pages' endpoint is selected,
// check the database and return an object 
// containing each item in the DB
router.get("/list_pages", (req, res) => {
    if(mongoose.connection.readyState == 1){
        Data.find({}, (err, pages) => {
            if (err)
                res.send(err);
            res.json(pages)
        })
    } else{ // If no page is found or there is no connection do this
        res.status(503).json({
            status: "failed",
            message: "No database connection established"
        })
    }
})

module.exports = router;