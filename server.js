var express = require("express");
var mongo = require("mongodb").MongoClient;
var path = require("path");

var routes = require("./app/routes/index.js");
var api = require("./app/api/api.js");

var app = express();

mongo.connect(process.env.MONGODB_URI, function(err, db){
    if (err) throw err;
    
    db.createCollection("links");
    
    var links = db.collection("links");
    
    app.set("views", path.join(__dirname, "views"));
    
    app.set("view engine", "pug");
    
    routes(app);
    api(app, links);
    
    app.listen(process.env.PORT);
});