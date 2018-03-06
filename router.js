var bodyParser = require('body-parser');
var fs = require('fs');
var UserController = require('./controllers/UserController');
var PlanController = require('./controllers/PlanController');

// Routes
module.exports = function(app){
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(function(req, res, next) {
		res.locals.user = req.session.userId;
		next();
	});

	// General routes
	app.get('/', function(req, res){
			res.render('login');
	});
	// app.get('/home', function(req,res){
	// 		res.render('home')
	// });
	app.get('/about', function(req, res){
			res.render('about');
	});

	// Routes related to Plan
	app.get('/home', function(req, res){
		if (req.session && req.session.userId) {
			res.render('home');
		} else {
			res.render('login');
		}
	});
	// app.get('/profile_page', function(req, res){
	// 	if (req.session && req.session.userId) {
	// 		res.render('profile_page');
	// 	} else {
	// 		res.render('info_page',{data: 'You must be logged in to view this page. Back to ', name:'login', link:'login_page'});
	// 	}
	// });
	// app.post('/savePlan',PlanController.savePlan);

	app.get('/profile_page', UserController.getProfile);
	
	app.get('/plans_page', function(req, res){
		if (req.session && req.session.userId) {
			res.render('plans_page');
		} else {
			res.render('info_page',{data: 'You must be logged in to view this page. Back to ', name:'login', link:'login_page'});
		}	
	});
	app.get('/get_plans', PlanController.getPlans);
	app.get('/contact', function(req, res){
		res.render('contact', { csrf: 'CSRF token here'});
	});
	app.get('/register_page', function(req, res){
		res.render('register');
	});
	app.get('/verify_user/:email/:verfhash', UserController.verifyUser);
	// app.post('/createUser', UserController.createUser);
	app.get('/login_page', function(req, res){
		res.render('login');
	});
	// app.post('/loginUser', UserController.loginUser);
	app.get('/logout_page', UserController.logoutUser);

	app.get('/info_page', function(req, res){
		res.render('info_page',{data: 'Welcome. Click here to  ', name:'login', link:'login_page'});
	});

	app.post('/savePlan',PlanController.savePlan);
	app.post('/searchPlan',PlanController.searchPlan);
	app.post('/joinPlan',PlanController.joinPlan);
	// app.post('/profile_page', function(req, res){
	// 	res.redirect('/profile_page');
	// });
	app.post('/profile_page', UserController.updateProfile);
	app.post('/createUser', UserController.createUser);
	app.post('/loginUser', UserController.loginUser);
	// app.post('/searchPlan', function(req, res){
	//
	// 	PlanController.searchPlan(req, res);
	//
	// 	//if (err) return res.sendStatus(500);
	//
	//
	// 	console.log("inside search plan");
	// 	//res.render('contact', { csrf: 'CSRF token here'});
	// });
	// app.post('/profile_page', function(req, res){
	// 	res.redirect('/profile_page');
	// });


	// Routes related to User


	// app.get('/register_page', function(req, res){
	// 		res.render('register');
	// });
	// app.get('/verify_user/:email/:verfhash', UserController.verifyUser);
	// // app.post('/createUser', UserController.createUser);
	// app.get('/login_page', function(req, res){
	// 		res.render('login');
	// });
	// // app.post('/loginUser', UserController.loginUser);
	// app.get('/logout_page', UserController.logoutUser);

	// app.get('/info_page', function(req, res){
	// 	res.render('info_page',{data: 'Welcome. Click here to  ', name:'login', link:'login_page'});
	// });

	};
