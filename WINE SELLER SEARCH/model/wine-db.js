var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wineSchema = new Schema({
    sweetness:{
        type:String , 
        enum: ['moscato' , 'white_zinfandel','riesling' , 'port' , 'sauternes']

    },
    percent_sweet:{
        type:Number , 
        default:0,
    },
    percent_acid:{
        type:Number,
        default:0,
    },
    percent_alcohol:{
        type:Number,
        default:0,
    },
    body:{
        type:String,
        enum:['light', 'medium' ,'full'],
    },
    storage_period:{
        type:Number,
        default:0,
    },
    availability:{
        type:Boolean , 
        default:false,
    },
    quantity:{
        type:Number,
        default:0,
    },
    manufacture_date:{
        type:Date,
    },
    name:{
        type:String,
        default:'--------'

    }

  
});


module.exports = mongoose.model('wine', wineSchema);