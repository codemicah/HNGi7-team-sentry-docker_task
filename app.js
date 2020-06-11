/**
 * @namespace app
 * 
 * @file
 * 
 * This is the main server for the app. It is the command center
 * for all controllers and integrates all their functionality
 */

 /**
  * @method 
  * It uses the 'use' method to connect all the respective endpoints 
  * and connects the endpoints to make them accessible through the /api/ path
  */

const app = require("express")(),
            config = require("./config/config");

const add_page_controller = require("./controllers/add_page_controller")
const list_pages_controller = require("./controllers/list_pages_controller")
const set_page_markdown_controller = require("./controllers/set_page_markdown_controller")
const retrieve_page_html_controller = require("./controllers/retrieve_page_html_controller")

app.use("/api", add_page_controller)
app.use("/api", list_pages_controller)
app.use("/api", set_page_markdown_controller)
app.use("/api", retrieve_page_html_controller)

app.get("/", (req,res)=>{
    res.redirect("/api")
})

app.get("/api", (req, res)=>{
    res.sendFile("./index.html", {
        root: __dirname
    })
})

app.get("*", (req, res)=>{
    res.send("<h1 style='background-color: orangered;padding: 10px;'>SORRY THAT PAGE COULD NOT BE FOUND ON THIS SERVER </h1><br> PLEASE GO BACK TO THE <a href='/'>/api</a> FOR HELP")
})

const port = 3000
app.listen(process.env.PORT || port, ()=>{
    console.log("Server listening on port " + port + " >>> \n docker on port 4000")
})
