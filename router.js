var bodyParser = require('body-parser');



var UserController = require('./controllers/UserController');
var PlanController = require('./controllers/PlanController');
// Routes
module.exports = function(app){
	app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true })); 
    // Main Routes
    
    app.get('/', function(req, res){
  		res.render('home');
	});
	app.get('/about', function(req, res){
  		res.render('about');
	});
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
	app.get('/profile_page', function(req, res){
		res.render('profile_page');
	});
	app.get('/search_plan_page', function(req, res){
		res.render('search_plan_page');
	});
};

