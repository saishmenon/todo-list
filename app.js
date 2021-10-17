const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const port = 3000;
const items = ["Buy Food", "Eat Food", "Cook Food"];
const workItems = [];


app.get("/", function(req, res){
    
    let day = date.getDate();
    res.render("list", {listTitle: day, newListItem: items});
});

app.post("/", function(req, res){
    
    console.log(req.body);
    let item = req.body.newItem;
    
    if(item !== ""){
        
        if(req.body.button === "Work"){
            workItems.push(item);
            console.log("Item pushed to workItems array");
            res.redirect("/work");
        }else{
            items.push(item);
            console.log("Item pushed to items array!");
            res.redirect("/");
        }
    }else{
        console.log("Empty value hence, didn't push.");
    }
});


//For the Work page
app.get("/work", function(req, res){
    let work = "Work"
    res.render("list", {listTitle: work, newListItem: workItems});
});

app.get("/about", function(req, res){
    res.render("about");
});

app.listen(port, function(){
    console.log("Server started on port: " + port);
});