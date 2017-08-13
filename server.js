
var express = require('express');
var app = express();
var https = require("https");
var requestt = require('request');

app.use(express.static('public'));

app.get("/", function (request, response) {
  
  var options = {
    url: 'https://api.imgur.com/3/gallery/search?q=test',
    headers: {
       Authorization: 'Client-ID '+process.env.CLIENT_ID,
    }
  };

  requestt(options,function(error, res, body) {
    if(error) {console.log(error);}
    if (!error) {
      response.json(JSON.parse(body));
      return ;
    }
    else
      {
        response.json({});
      }
  });
  
  
});


app.get("/",function(request,response){
  response.sendFile(__dirname+);
});



var listener = app.listen(process.env.PORT);
