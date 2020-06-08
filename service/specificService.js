//if we need to make third party requests
var request = require('request');


var specificService = {
   findService: function(req, res, next) {
       res.send('Take');

   }
};

module.exports = specificService;