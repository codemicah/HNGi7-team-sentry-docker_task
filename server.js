const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const pageRouter = require("./route/page");

//development middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());

//database connection
mongoose
  .connect(process.env.db_prod, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("connection not succesful");
  });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
const path = __dirname + "/views/";
const port = 8080;

router.use(function (req, res, next) {
  console.log("/" + req.method);
  next();
});

router.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

router.get("/sharks", function (req, res) {
  res.sendFile(path + "sharks.html");
});

app.use(express.static(path));
app.use("/", router);

app.use("/app/pages", pageRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.log("Example app listening on port" + PORT);
});
