'use strict';

const express = require('express');
const app = express();

// Constants
const PORT = 3000;
const HOST = "localhost";

const routes = require('./api/routes');
routes(app);

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);