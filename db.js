var MongoClient = require('mongodb').MongoClient;
//var uri = "mongodb+srv://root:root@cluster0-wubzu.mongodb.net/test";
var uri = "mongodb://localhost:27017/wolfpool";

MongoClient.connect(uri, function(err, db) {
  console.log("connected");
  var date = new Date();
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" + date.getTime()};
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted at " + date.getTime());
    db.close();
  });
});
