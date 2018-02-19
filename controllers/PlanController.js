var geolib=require('geolib');
var haversine = require('haversine-distance');
exports.savePlan = function(request, response){

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
      response.render('info_page',{data:"Item saved to database. Back to ", name:'home',link:'home' });
    })
    .catch(err => {
      console.log(err)
      response.render('info_page',{data:"unable to save to database"});
    });
};

exports.searchPlan = function(request, response){
  console.log(request.body)
  var Plan = require('../models/plan');
  console.log("************search plan");
  var currSrc = {lat: 35.7876073, lng: -78.6692593}; //need to add data from server that user has entered
  var currDest = {lat: 40.7127753, lng: -74.0059728};
  var query={"vacancy":{$gt:0}}; //Data : {$gt:Date.now}
  Plan.find(query,(err,plans)=>{
    if(err){
      response.status(500).send(err);
    }else{
      console.log("found"+plans.length);
      var results=[];
      for(var i=0;i<plans.length;i++){
        var optionSrc = {lat:plans[i].source_lat,lng:plans[i].source_long};
        var optionDest = {lat:plans[i].dest_lat,lng:plans[i].dest_long};
        console.log("dist "+haversine(currSrc, optionSrc));
        if(haversine(currSrc, optionSrc)<3000 && haversine(currDest, optionDest)<3000){ //specifying distance should be <3000 metres
          results.push(plans[i]);
        }
      }
      console.log("*********result "+results[0]);
      response.status(400).send(results);
    }
  });
};
