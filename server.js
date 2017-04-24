
var mynames = [
  {name: "james", age:"22"},
  {name: "tom", age:"25"}
];

var express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function (request, response) {
  response.setHeader('Content-Type', 'application/json');
  response.send( JSON.stringify(mynames) );
});

app.post("/age", function (request, response) {
  console.log(request.body)
  
  response.setHeader('Content-Type', 'application/json');

  var name = request.body.name
  console.log(mynames.length)
  for(var i=0;i<mynames.length;i++) {
    
    var person = mynames[i]
    if (person.name == name) {
      response.send( JSON.stringify({age: person.age}) );
      return
    }
    
  }
  
  response.send( JSON.stringify({age: 0}) );
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


//curl -d '{"name":"tom"}' -H "Content-Type: application/json" https://sneaky-vision.glitch.me/age