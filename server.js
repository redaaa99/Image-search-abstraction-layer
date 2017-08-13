
var express = require('express');
var app = express();
var mongodb = require('mongodb');
var requestt = require('request');
var databaseUrl = 'mongodb://'+process.env.USER+':'+process.env.PASS+'@'+process.env.HOST+':'+process.env.DB_PORT+'/'+process.env.DB;


app.use(express.static('public'));

function insertInDb(term,db){
  db.collection("history").insertOne({
    "term" : term,
    "when" :new ISODate()
  })
}

mongodb.MongoClient.connect(databaseUrl,function (err, db){
  if(err){throw err;}
  app.get("/search/:term", function (request, response) {
  insertInDb(request.params.term,db);
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
      var array = [];
      JSON.parse(body).data.slice(0,40).map(function(element){
        if(element.type)
          {
            array.push({
              id : element.id,
              title :element.title,
              description : element.description,
              link : element.link
            })
          }
        else
          {
            array.push({
              id : element.id,
              title :element.title,
              description : element.description,
              link : element.images[0].link
            })
          }
          
      });
      response.json(array);
      return ;
    }
    else
      {
        response.json({});
      }
  });
});

  app.get("/history",function (request,response){
    db.collection("history").find({}).sort({_id: 1}).limit(10).toArray(function(err,data){
      if(err){throw err;}
      var arra = [];
      data.map(function(element){
        arra.push({term : element.term,
                  when : element.when})
      });
      response.json(arra);
      
    });
  });
  app.get("/",function(request,response){
    response.sendFile(__dirname+"/views/index.html");
  });
  app.listen(process.env.PORT);
});