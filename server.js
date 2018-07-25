// Dependencies listed:

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var mysql = require("mysql");
var request = require("request");


// Setting up port for Heroku.

var PORT = process.env.PORT || 8080;


// Creating our app variable for express.

var app = express();


// setting up the packages to use and engine to utilize.

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use(express.static('public'));


// Setting up our mysql database information.

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "movies_to_watch_DB"
});


// Connecting to the sql database.

connection.connect(function(err){
    if(err){
        console.error("error connecting: " + err.stack);
        return;
    }

    console.log("connected as id " + connection.threadId);
});


// Using handlebars to pull the data from the database to display on the home page.

app.get("/", function(req, res){
    connection.query("SELECT * FROM to_see_list;", function(err, data){
        if(err){
            return res.status(500).end();
        }

        res.render("index", {to_see_list: data});
    });
});




// Adding a new movie to the to_see_list

app.post("/tosee", function(req, res){
    connection.query("INSERT INTO to_see_list (name) VALUES (?)", [req.body.name], function(err, result){
        if(err){
            return res.status(500).end();
        }

        res.json({ id: result.insertId });
        console.log({ id: result.insertId });
    });
});


// Getting all the to_see_list.

app.get("/tosee", function(req, res){
    connection.query("SELECT * FROM to_see_list;", function(err, data){
        if(err){
            return releaseEvents.status(500).end();
        }

        res.json(data);
    });
});


app.delete("/tosee/:id", function(req, res){
    connection.query("DELETE FROM to_see_list WHERE id = ?", [req.params.id], function(err, result){
        if(err){
            return res.status(500).end();
        }
        else if(result.affectedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
        console.log(result);
    });
});


app.put("/tosee/:id", function(req, res){
    
    connection.query("UPDATE to_see_list SET name = ? WHERE id = ?", [req.body.name, req.params.id], function(err, result){
        if(err){
            return res.status(500).end();
        }
        else if(result.changedRows === 0){
            return res.status(404).end();
        }
        res.status(200).end();
    });
});


app.get("/search/:movie", function(req, res){

    var searchMovie = req.params.movie;
    var jsonData;

    var queryUrl = "http://www.omdbapi.com/?t=" + searchMovie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        jsonData = JSON.parse(body);

        console.log(jsonData);

        res.send(jsonData);
    });
    
});



        


app.listen(PORT, function(){
    console.log("Server listening on: http://localhost:" + PORT);
});