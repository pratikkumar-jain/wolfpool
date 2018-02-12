var express = require('express');
var app = express();
var session = require('express-session');
var handlebars = require('express-handlebars');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);

// Database code
mongoose.connect('mongodb://localhost:27017/wolfpool');
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Handlebar Code
handlebars = handlebars.create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// Session related for tracking logins
app.use(session({
  secret: 'SENG',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    // mongooseConnection: db https://github.com/jdesboeufs/connect-mongo/issues/277
    url: 'mongodb://localhost:27017/wolfpool'
  })
}));

// App configuration
app.disable('x-powered-by');
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

// send app to router
require('./router')(app);

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
