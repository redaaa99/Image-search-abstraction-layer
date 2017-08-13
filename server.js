
var express = require('express');
var app = express();
var https = require("https");
var requestt = require('request');




app.use(express.static('public'));



app.get("/", function (request, response) {
  
  var options = {
    url: 'https://api.imgur.com/3/gallery/Hpg63',
    headers: {
       Authorization: 'Client-ID '+process.env.CLIENT_ID,
    }
  };

  requestt(options,function(error, res, body) {
    if (!error) {
      
      return ;
    }
    response.json(body);
  });
  
  response.sendFile(__dirname + '/views/index.html');
});



var listener = app.listen(process.env.PORT);
