const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const port = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true});

const itemSchema = {
    name: String
};

// Dummy date to be inserted if the database is empty
const Item = mongoose.model("Item", itemSchema);

const buyCoffee = new Item({
    name: "Buy Coffee"
});

const drinkCoffee = new Item({
    name: "Drink Coffee"
});

const makeBreakfast = new Item({
    name: "Make Breakfast"
});

const defaultItems = [buyCoffee, drinkCoffee, makeBreakfast];

//Home page load
app.get("/", function(req, res){
    
    Item.find({}, function(err, foundItems){
        if(err){
            console.log(err);
        }else if(foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully added the items to the database.");
                }
            });
        }else{
            console.log(foundItems);
            res.render("list", {listTitle: "Today", newListItem: foundItems});
        }
    });
});

// Adding a new To Do item
app.post("/", function(req, res){
    
    console.log(req.body);
    let item = req.body.newItem;
    
    if(item !== ""){
        
        var object = {
            name: item,
          };

        if(req.body.button === "Work"){
            workItems.push(item);
            console.log("Item pushed to workItems array");
            res.redirect("/work");
        }else{
            Item.create(object, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully added " + item + ".");
                }
            });
            
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