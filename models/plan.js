var mongoose = require('mongoose');

function time_format (time) {
  return '****-****-****-' + cc.slice(cc.length-4, cc.length);
}

var planSchema = new mongoose.Schema({
  source_lat: String,
  source_long: String,
  dest_lat: String,
  dest_long: String,
  date: {
  	type: Date,
  	format: 'YYYY-MM-DD'
 	},
  time:
  {
  	type: String,
  	format: '00:00'
  }

});

module.exports = mongoose.model('Plan', planSchema);