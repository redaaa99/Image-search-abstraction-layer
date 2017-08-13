
var express = require('express');
var app = express();
var https = require("https");
var request = require('request');




app.use(express.static('public'));



app.get("/", function (request, response) {
  var options = {
    url: 'https://api.imgur.com/3/image/search/?q=test',
    headers: {
      'User-Agent': 'request',
       Authorization: 'Client-ID '+process.env.CLIENT_ID,
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
    }
  }

  request(options, callback);
  response.sendFile(__dirname + '/views/index.html');
});



var listener = app.listen(process.env.PORT);
