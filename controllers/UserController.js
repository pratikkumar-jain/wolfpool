exports.createUser = function(req, res){

  var User = require('../models/user');
  var nodemailer = require('nodemailer');
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

          // Code to send email with verification link
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'sengncsu2018@gmail.com',
              pass: 'SengNcsu'
            }
          });

          var mailOptions = {
            from: 'support@wolfpool.com',
            to: req.body.email,
            subject: 'Wolfpool user verification',
            html: '<h1>Please click on the <a href="www.google.com/'+ verfhash +'">link</a> to verify your account</h1>The link will expire in 24 hours'
          };

          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
              return res.send('An email has been sent to you with verification link please');
            }
          });
        }
      });

  } else {
    return res.redirect('/');
  }
};
