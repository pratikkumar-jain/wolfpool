var mongoose = require('mongoose');
var planSchema = new mongoose.Schema({
  source_lat: String,
  source_long: String,
  dest_lat: String,
  dest_long: String,
  date: Date,
  time: Date,
  vacancy: Number

});

module.exports = mongoose.model('Plan', planSchema);