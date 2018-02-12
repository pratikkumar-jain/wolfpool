exports.createUser = function(req, res){

  var User = require('../models/user');
  // Check if all parameters are passed
  if (req.body.email && req.body.name && req.body.password) {

      var userData = {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        phone: null,
        gender: null,
        verified: false,
        university: null,
        address: null
      }

      //use schema.create to insert data into the db
      User.create(userData, function (err, user) {
        if (err) {
          console.log(err);
          return res.render('500');
        } else {
          return res.redirect('/');
        }
      });

  } else {
    return res.redirect('/');
  }
};
