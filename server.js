
var express = require('express');
var app = express();
var https = require("https");
var requestt = require('request');

app.use(express.static('public'));

app.get("/search/:term", function (request, response) {
  /*store search term in history*/
  var offset = request.query.offset;
  if((!offset) || (offset > 50) || (offset < 1))
    {
      offset = 10;
    }
  console.log(offset);
  var options = {
    url: 'https://api.imgur.com/3/gallery/search?q='+request.params.term+'&page='+offset,
    headers: {
       Authorization: 'Client-ID '+process.env.CLIENT_ID,
    }
  };

  requestt(options,function(error, res, body) {
    if(error) {console.log(error);}
    if (!error) {
      response.json(JSON.parse(body).data/*.slice(offset,5)*/);
      return ;
    }
    else
      {
        response.json({});
      }
  });
});


app.get("/",function(request,response){
  response.sendFile(__dirname+"/views/index.html");
});



var listener = app.listen(process.env.PORT);
