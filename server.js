var express = require('express');
var bodyParser = require('body-parser');
var async = require('async');
var breweryDb = require('brewerydb-node');
var brewDb = new breweryDb('b7db985c5f13c3e742a8bbf0a965976a');

var app = express();

app.set('port', (process.env.PORT || 4500));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use (function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Acccess-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  next();
});

app.get('/api/beers', function (req, res) {
  brewDb.search.all({
    q: 'corona'
  }, function (err, beer) {
    if (err) {
      res.send({
        error: 'Error' + err
      })
    } else {
      var beerData = [];
      for (var i=0; i<beer.length; i++) {
        beerData.push(beer[i].id, beer[i].name)
      }
      res.send({
        beer: beer
      });
    }
  });
});

app.listen(app.get('port'), function (req, res) {
  console.log('Server started');
});
