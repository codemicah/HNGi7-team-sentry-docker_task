'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/api/retrieve_page_html')
       .get(controller.getService1);
   app.route('/api_retrieve_page_html/:id')
       .get(controller.getService2);
};