var express = require('express');

var app = express();

app.disable('x-powered-by');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('home');
});

app.use(function(req, res, next){
  console.log("Looking for URL : " + req.url);
  next();
});

app.get('/junk', function(req, res, next){
  console.log('Tried to access /junk');
  throw new Error('/junk doesn\'t exist');
});

app.use(function(err, req, res, next){
  console.log('Error : ' + err.message);
  next();
});

app.get('/about', function(req, res){
  res.render('about');
});

app.get('/contact', function(req, res){
  res.render('contact', { csrf: 'CSRF token here'});
});

app.get('/profile_page', function(req, res){
  res.render('profile_page');
});

app.get('/search_plan_page', function(req, res){
  res.render('search_plan_page');
});

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

var MongoClient = require('mongodb').MongoClient;
//var uri = "mongodb+srv://root:root@cluster0-wubzu.mongodb.net/test";
var uri = "mongodb://localhost:27017/wolfpool";

MongoClient.connect(uri, function(err, db) {
  console.log("connected");
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" + date.getTime()};
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    var date = new Date();

    console.log("1 document inserted at " + date.getTime());
    db.close();
  });
});
