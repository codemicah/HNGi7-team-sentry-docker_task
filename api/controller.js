'use strict';


var specificService = require('../service/specificService');
var retrievePageHtml = require('../service/retrievePageHtml');
var jquery = require('jquery');
var controllers = {
  
    getService1: function(req, res) {
     retrievePageHtml.getPageHtml(req, res, function(err, data) {
                if (err)
                    res.send(err);
                res.json(data);
                // res.send(data);
                
            });
        },
        
     getService2: function(req, res) {
     retrievePageHtml.getPageHtml(req, res, function(err, data) {
                 if (err)
                     res.send(err);
                 res.json(data);
             });
         },
 };

module.exports = controllers;