exports.savePlan = function(request, response){
    //response.send(request.body);
    var planModel = require('../models/plan')
    var planData = new planModel({source_lat:request.body.lat[0],
                                  source_long:request.body.lng[0],
                                  dest_lat:request.body.lat[1],
                                  dest_long:request.body.lng[1],
                                  date:request.body.date,
                                  time:request.body.time,
                                  vacancy:request.body.vacancy
                                });
  		planData.save()
    .then(item => {
      response.send("item saved to database");
    })
    .catch(err => {
      response.status(400).send("unable to save to database");
    });
};

exports.searchPlan = function(request, response){
    response.send('You sent the name "' + request.body + '".');
    //response.render('/home');
};
