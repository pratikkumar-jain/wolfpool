var bodyParser = require('body-parser');

var UserController = require('./controllers/UserController');
var PlanController = require('./controllers/PlanController');

// Routes
module.exports = function(app){
	app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

	// General routes
  app.get('/', function(req, res){
  		res.render('home');
	});
	app.get('/about', function(req, res){
  		res.render('about');
	});
	app.get('/login_page', function(req, res){
			res.render('login');
	});

	// Routes related to Plan
	app.get('/create_plan_page', function(req, res){
		res.render('create_plan_page');
	});
  app.post('/savePlan',PlanController.savePlan);
  app.get('/search_plan_page', function(req, res){
		res.render('search_plan_page');
	});
  app.post('/searchPlan',PlanController.searchPlan);
  app.get('/contact', function(req, res){
		res.render('contact', { csrf: 'CSRF token here'});
	});
	app.get('/search_plan_page', function(req, res){
		res.render('search_plan_page');
	});

	// Routes related to User
	app.get('/profile_page', function(req, res){
		res.render('profile_page');
	});
	app.get('/register_page', function(req, res){
			res.render('register');
	});
	app.get('/verify_user/:email/:verfhash', UserController.verifyUser);
	app.post('/createUser', UserController.createUser);
};
