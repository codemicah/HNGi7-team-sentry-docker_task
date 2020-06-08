// Using request promise to retrieve the html of the page
const rPromise = require('request-promise');
const cheerio = require('cheerio');
const axios = require('axios');
const jQuery = require('jquery');
const url = "https://www.wikipedia.com";

var retrievePageHtml = {
    getPageHtml: (req, res, next) => {
        // res.send(url);
        rPromise(url,
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // header = response.setHeader("")
            response = JSON.stringify(body);
            res.send({
                "status": 200,
                "data": response
            });
            
        } else {
            console.log(response.statusCode + response.body);
            res.send({"status": response.statusCode, "message": response.body});
        }
    });

    }
};

module.exports = retrievePageHtml;