var express = require('express');
var HTTP_PORT = 3000;

var middleware = {
    requireAuthentication: function(req, res, next) {
        console.log('private route hit!');
        next();
    },
    logger: function(req, res, next) {
        console.log("Request: " + new Date().toString() + ' ' + req.method + ' ' + req.originalUrl);
        next();
    },
}

var app = express();


//app.use(middleware.requireAuthentication);

app.use(middleware.logger);

app.use(express.static('public'));


app.get('/about', middleware.requireAuthentication, function(req, res) {
    res.send('About Us');
});

app.listen(HTTP_PORT, function(err) {
    if (err) {
        console.log('Server is not working ');
    } else {
        console.log('Express server started on port ' + HTTP_PORT + "!");
    }
});

app.get("*", function(req, res) {
    console.log('Unknown path, redirecting to root', req.path)
    res.redirect("/");
});
