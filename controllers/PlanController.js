var geolib=require('geolib');
var haversine = require('haversine-distance');
var Plan = require('../models/plan');

exports.savePlan = function(request, response){

    var planModel = require('../models/plan')
    var planData = new planModel({source_id:request.body.source,
                                  destination_id:request.body.destination,
                                  source_lat:request.body.lat[0],
                                  source_long:request.body.lng[0],
                                  dest_lat:request.body.lat[1],
                                  dest_long:request.body.lng[1],
                                  date:request.body.date,
                                  time:request.body.time,
                                  no_of_people:request.body.no_of_people,
                                  vacancy:6-request.body.no_of_people,
                                  emails:[request.session.userEmail]
                                });
  		planData.save()
    .then(item => {
      response.render('info_page',{data:"Plan created. Back to ", name:'home',link:'home' });
    })
    .catch(err => {
      console.log(err)
      response.render('info_page',{data:"Unable to create plan."});
    });
};


exports.getPlans = function(request, response){

  Plan.find({"emails":request.session.userEmail},function(err,planslist){
        response.send(planslist);
  });
};

exports.joinPlan = function(request, response) {

  var planId = request.body.selectedPlan;
  var numberOfPeople = request.body.numberOfPeople;

  Plan.findById(planId, function (err, plan) {
    if(err) {
        response.status(500).send("The plan you selected got full. Please search again.");
    }
    else {
        plan.emails.push(request.session.userEmail);
        plan.no_of_people = +plan.no_of_people + +numberOfPeople;
        plan.vacancy = +plan.vacancy - +numberOfPeople;
        plan.save();

        // Send email to users in list that current user joined plan
        var emails = [];
        plan.emails.forEach(function(email){
            emails.push({'Email': email});
        });
        console.log(emails);
        // Configure the api
        var mailjet = require('node-mailjet').connect(process.env.MJ_PUBLIC_KEY, process.env.MJ_PRIVATE_KEY)

        var mj_req = mailjet
            .post("send")
            .request({
                "FromEmail":"sengncsu2018@gmail.com",
                "FromName":"Wolfpool Support",
                "Subject":'Someone just joined your wolfpool plan!',
                "Html-part": 'Hi there!\n\t'+request.session.userName + ' just joined your trip with details listed below. You can get in touch with the email: ' + request.session.userEmail + '.\nTrip details:\nSource: '+plan.source_lat+'\nDestination:'+plan.dest_lat+'\nDate:'+plan.date+'\nTime:'+plan.time,
                "Recipients": emails
            });

        mj_req
        .then((result) => {
            return res.render('info_page',{data:'An email notification has been to your trip buddies.'});
        })
        .catch((err) => {
            console.log(err.statusCode)
        })

        response.setHeader('Content-Type', 'application/text');
        response.send("/plans_page");
    }
  });

}

exports.searchPlan = function(request, response){

  // Show all existing plans that the user can join, along with an option to create

  userRequest = request.body
  console.log(userRequest)

  console.log("************ search plan");
  console.log("source: "+userRequest.source);
  console.log("source lat: "+userRequest.lat[0]);
  console.log("source long: "+userRequest.lng[0]);
  console.log("destination: "+userRequest.destination);
  console.log("dest lat: "+userRequest.lat[1]);
  console.log("dest long: "+userRequest.lng[1]);
  console.log("date : "+userRequest.date);
  console.log("time : "+userRequest.time);
  var currSrc = {lat: userRequest.lat[0], lng: userRequest.lng[0]};
  var currDest = {lat: userRequest.lat[1], lng: userRequest.lng[1]};
  var query={"date":{$gte:userRequest.date},"time":{$gte:userRequest.time},"emails":{$ne : request.session.userEmail},"vacancy":{$gte:userRequest.no_of_people}}; //Change to vacancy - no_of_people
  //var query={"no_of_people":{$gt:0}}; //Data : {$gt:Date.now}
  Plan.find(query,(err,plans)=>{
    if(err) {
      response.status(500).send(err);
    } else {
      console.log("found "+plans.length);
      var results=[];
      for(var i=0;i<plans.length;i++){
        var optionSrc = {lat:plans[i].source_lat,lng:plans[i].source_long};
        var optionDest = {lat:plans[i].dest_lat,lng:plans[i].dest_long};
        //console.log("dist "+haversine(currSrc, optionSrc));
        if(haversine(currSrc, optionSrc)<2000 && haversine(currDest, optionDest)<2000){
          plans[i].src_distance=Math.round(haversine(currSrc, optionSrc)*0.000621371*100)/100; //to calculate the distance in miles
          plans[i].dest_distance=Math.round(haversine(currDest, optionDest)*0.000621371*100)/100; //to calculate the distance in miles
          results.push(plans[i]);
        }
      }
      console.log("*********result "+results);
      response.setHeader('Content-Type', 'application/json');
      response.send(JSON.stringify(results));
      console.log("*********response render sent");
    }
  });
};
