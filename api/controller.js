'use strict';

var retrievePageHtml = require('../service/retrievePageHtml');
var controllers = {
  
    getService1: function(req, res) {
     retrievePageHtml.getPageHtml(req, res, function(err, data) {
                if (err)
                    res.send(err);
                res.json(data);
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