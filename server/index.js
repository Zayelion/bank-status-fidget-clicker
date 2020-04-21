var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var cluster = require('cluster');


if (cluster.isMaster) {
  var cpuCount = require('os').cpus().length;

  cluster.on('exit', function (worker) {
    console.log(`Worker ${worker.id} died`);
    cluster.fork();
  });


  for (var i = 0; i < cpuCount; i += 1) {
    console.log('Creating new worker', i);
    cluster.fork();
  }



} else {


  let dataios = [
    { type: 'savings', accountNumber: 'XXXX-XXXX-XXXX-1235', balance: 921.00 },
    { type: 'checking', accountNumber: 'XXXX-XXXX-XXXX-7414', balance: 100.00 },
    { type: 'checking', accountNumber: 'XXXX-XXXX-XXXX-1112', balance: 3512.00 },
    { type: 'checking', accountNumber: 'XXXX-XXXX-XXXX-7815', balance: 12.00 },

  ]

  let dataandroid = [
    { type: 'loans', accountNumber: 'XXXX-XXXX-XXXX-1114', balance: 651136.00 },
    { type: 'credit', accountNumber: 'XXXX-XXXX-XXXX-2582', balance: 8230.00 },
    { type: 'savings', accountNumber: 'XXXX-XXXX-XXXX-1358', balance: 31085.00 },
    { type: 'checking', accountNumber: 'XXXX-XXXX-XXXX-9991', balance: 651.00 },

  ];


  function getRandomInt(min, max) {
    return (Math.random() * (max - min) + min);
  }

  function update(data) {
    data.forEach((item) => {
      item.balance = (Number(item.balance) + getRandomInt(-100, 100)).toFixed(2);
    });
  }


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


    ]));
  });



  function handleWS(ws, data) {
    ws.on('message', function (msg) {
      console.log(msg);
    });

    ws.send(JSON.stringify(data));
    const wait = setInterval(() => {
      update(data);
      ws.send(JSON.stringify(data));
    }, 3000);

    ws.on('close', () => {
      clearInterval(wait);
    });
  }
  app.ws('/ios', function (ws, req) {
    handleWS(ws, dataios);
  });

  app.ws('/android', function (ws, req) {
    handleWS(ws, dataandroid);
  });

  app.listen(3000);

}