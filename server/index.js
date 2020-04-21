var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

app.use(express.static('./httpdocs'))

app.get('/', function (req, res, next) {
  console.log('get route', req.testing);
  res.end();
});

app.ws('/', function (ws, req) {
  ws.on('message', function (msg) {
    console.log(msg);
  });
  ws.send(JSON.stringify([
    {type : 'savings'},
    {type : 'checking'},
    {type : 'checking'},
    {type : 'checking'},

  ]));
});

app.listen(3000);