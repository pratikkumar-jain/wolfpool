exports.savePlan = function(request, response){
    //response.send(request.body);
    var planModel = require('../models/plan')
    var planData = new planModel(request.body);
  		planData.save()
    .then(item => {
      response.send("item saved to database");
    })
    .catch(err => {
      response.status(400).send("unable to save to database");
    });
    //response.render('/home');
};

exports.searchPlan = function(request, response){
    response.send('You sent the name "' + request.body + '".');
    //response.render('/home');
};