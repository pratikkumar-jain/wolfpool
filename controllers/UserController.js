var schedule = require('node-schedule');
exports.createUser = function(req, res){

  var User = require('../models/user');
  var md5 = require('md5');

  // Check if all parameters are passed
  if (req.body.email && req.body.name && req.body.password) {

      var verfhash = md5(req.body.email+(new Date()).getTime());
      var userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: null,
        gender: null,
        verified: false,
        verification_hash: verfhash,
        university: null,
        address: null
      }

      //use schema.create to insert data into the db
      User.create(userData, function (err, user) {
        if (err) {
          console.log(err);
          return res.render('500');
        } else {

          // For local debugging
          // var websitehost = 'http://localhost:3000';
          var websitehost = 'http://wpool-dev.us-east-1.elasticbeanstalk.com';

          // Configure the api
          var mailjet = require('node-mailjet').connect(process.env.MJ_PUBLIC_KEY, process.env.MJ_PRIVATE_KEY)

          var request = mailjet
              .post("send")
              .request({
                  "FromEmail":"sengncsu2018@gmail.com",
                  "FromName":"Wolfpool Support",
                  "Subject":'Wolfpool user verification',
                  "Html-part":'<h3>Please click on the <a href="' + websitehost + '/verify_user/' + req.body.email + '/' + verfhash + '">link</a> to verify your account</h3>The link will expire in 24 hours',
                  "Recipients":[
                    {
                            "Email": req.body.email
                    }
                  ]
              });

          request
          .then((result) => {
              return res.render('info_page',{data:'An email has been sent to you with verification link.'});
          })
          .catch((err) => {
              console.log(err.statusCode)
          })
        }
      });

  } else {
    return res.redirect('/');
  }
};

exports.verifyUser = function(req, res){

  var User = require('../models/user');

  // Check if all parameters are passed
  if (req.params.email && req.params.verfhash){
    User.findOne({email : req.params.email, verification_hash: req.params.verfhash, verified: false})
      .exec(function(err, user){
      if (err) {
        return res.render('500')
      } else if (!user) {
        console.log('User not found.');
        return res.render('404');
      } else {
        User.update(
          { email : req.params.email},
          { "$set": { verified: true } },
          function (err, raw) {
            if (err) {
                console.log('Error log: ' + err)
            } else {
                res.render('info_page',{data:'Account Verified. Search for ',name:'plans', link:'create_search_plan_page'});
            }
          }
        )
      }
    })
  } else {
    return res.render('404');
  }
};

exports.loginUser = function(req, res){
  var User = require('../models/user');
  var bcrypt = require('bcrypt');
  // Check if all parameters are passed
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id;
        return res.redirect('/home');
      }
    });
  }
};

exports.logoutUser = function(req, res, next){
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
}

var rule = new schedule.RecurrenceRule();
rule.hour = 0;

var j = schedule.scheduleJob(rule, function(){
  console.log('Batch Executed');
  var Users = require('../models/user');
  var query={"verified":false};  //add check for date>=24 hrs in past
  Users.find(query).remove().exec();
});
