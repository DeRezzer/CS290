/*
 * Write your routing code in this file.  Make sure to add your name and
 * @oregonstate.edu email address below.
 *
 * Name: Martin Escoto
 * Email: escotom@oregonstate.edu
 */

var path = require('path');
var express = require('express');

var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

var twitData = require('./twitData');
//console.log("==twitData", twitData);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/', function(req, res, next){
  res.status(200).render('homePage', {twitData});
  console.log("hey this works");
});

app.get('/twits/:n', function(req, res, next){
  var n = req.params.n;
  if(twitData[n]){
    var arr = [];
    arr[0] = twitData[n];
    res.status(200).render('homePage', {twitData: arr, displayModal: false});
    console.log("==twitData[n]", twitData[n]);
    //console.log("this called but this is empty as well");
  }else{
    next();
  }
});

app.get('*', function (req, res) {
  //res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
  res.status(404).render('404');
});

app.listen(port, function () {
  console.log("== Server is listening on port", port);
});
