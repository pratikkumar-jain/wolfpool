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
  userRequest = request.body
  console.log(userRequest)
  var Plan = require('../models/plan');
  console.log("************search plan");
  console.log("source lat: "+userRequest.lat[0]);
  console.log("source long: "+userRequest.lng[0]);
  console.log("dest lat: "+userRequest.lat[1]);
  console.log("dest long: "+userRequest.lng[1]);

  var currSrc = {lat: userRequest.lat[0], lng: userRequest.lng[0]};
  var currDest = {lat: userRequest.lat[1], lng: userRequest.lng[1]};
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
