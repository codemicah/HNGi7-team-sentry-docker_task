
const express = require("express"),
            config = require("./config/config");
            require("dotenv").config();

const app = express()
app.use(express.static("Resources"))

const add_page_controller = require("./controllers/add_page_controller"),
            list_pages_controller = require("./controllers/list_pages_controller"),
            set_page_markdown_controller = require("./controllers/set_page_markdown_controller"),
            retrieve_page_html_controller = require("./controllers/retrieve_page_html_controller"),
            registerController = require("./controllers/registerController"),
            signinController = require("./controllers/signinController"),
            config_controller= require("./controllers/configController")
            

app.use("/", registerController)
app.use("/", signinController)
app.use("/v1", add_page_controller)
app.use("/v1", list_pages_controller)
app.use("/v1", set_page_markdown_controller)
app.use("/v1", retrieve_page_html_controller)
app.use("/v1",config_controller)

app.get("/v1/documentation", (req, res) => {
    res.sendFile("api_docs.json", {
        root: __dirname
    })
})
app.get("/", (req, res) => {
    res.sendFile("index.html", {
        root: __dirname
    })
})

app.get("/home", (req, res)=>{
    res.render("home.ejs")
})

app.get("*", (req, res) => {
    res.send("<h1 style='background-color: orangered;padding: 10px;'>SORRY THAT PAGE COULD NOT BE FOUND ON THIS SERVER </h1><br> PLEASE GO BACK TO THE <a href='/'>/api</a> FOR HELP")
})

const port = 3000
app.listen(process.env.PORT || port, () => {
    console.log("Server listening on port " + port + " >>> \n docker on port 4000")
})