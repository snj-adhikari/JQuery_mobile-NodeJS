var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var contact = new Schema({
    name:String,
    org:String,
    know_relation:String,
    rating:Number,
    trust:Number,
    primary_no:Number,
    secondary_no:Number,
    available:[{
        type:String,
    }]
});



module.exports = mongoose.model('contact', contact);