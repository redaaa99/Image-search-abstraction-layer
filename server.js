
var express = require('express');
var app = express();
var https = require("https");


var qs = require('querystring')
  , oauth =
    { consumer_key: process.env.CLIENT_ID
    , consumer_secret: process.env.CLIENT_SECRET
    }
  , url = 'https://api.twitter.com/oauth/request_token'
  ;

app.use(express.static('public'));



app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});



var listener = app.listen(process.env.PORT);
