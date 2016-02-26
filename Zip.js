var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var zip = new Schema({
  _id : {type: String},
  city : {type: String},
  loc : [Number],
  pop : {type: Number},
  state : {type: String}
});

module.exports= mongoose.model('Zip', zip);
