const router = require("express").Router(),
            Data = require("../config/database/database"),
            Config = require("../config/config"),
            mongoose = require("mongoose"),
            config = require("../config/config");


// request = require("request"),
// mongoose = require("mongoose");
router.get("/list_pages", require("../config/Auth/authenticate"), (req, res) => {
    if(mongoose.connection.readyState == 1){
        // const url = req.body.url;
        Data.find({}, (err, pages) => {
            if (err)
                res.send(err);
            res.json(pages)
        })
    }
    else{
        res.status(503).json({
            status: "failed",
            message: "No database connection established"
        })
    }
})

module.exports = router;