module.exports = function(app, db) {
    app.get("/new/:url*", function(req, res) {
        var url = req.url.slice(5);
        
        var randNum = newFourDigit();
        
        if (checkURL(url)) {
            var obj = { "long-url": url, "short-url": "https://fcc-api-development-dacuban.c9users.io/" + randNum };
            
            res.json(obj);
            
            db.insert(obj);
        } else {
            res.send("Error: Unproper URL format. Make sure to include protocol");
        }
    });
    
    app.get("/:num", function(req, res) {
        var short_url = "https://fcc-api-development-dacuban.c9users.io/" + req.params.num;
        
        if (!isNaN(req.params.num)) {
            db.find({
                "short-url": short_url
            }).toArray(function(err, obj) {
                if (err) console.log(err);
                if (obj[0] != undefined) {
                    res.redirect(obj[0]["long-url"]);
                } else {
                    res.send("Error: That url does not exist. Make sure you have the right 4 digits");
                }
            });
        } else if (req.params.num === ""){
            res.send();
        } else {
            res.send("Error: Can't process request because there is no four digit number.");
        }
    });
    
    app.get("*", function(req, res) {
        res.send("Error: Can't process request. Make sure to check the home page to see how to use the API correctly.");
    });
    
    function newFourDigit() {
        return Math.floor(Math.random() * 9000) + 1000;
    }
    
    function checkURL(url) {
        var urlRegEx = new RegExp("^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$", "g");
        
        return urlRegEx.test(url);
    }
};