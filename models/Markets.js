const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  marketname:
{
  type:String,
  required: true,
},
img:{
  type:String,
  default:String
},

markettype:{
  type:String,
  enum:["Farmers market", "Covered market", "Street-Food-Market", "Flea Market"]
},
location: {
  type: {
    type: String,
    enum: ["Point"],
    default: "Point"
  },
  coordinates: {
    type: [Number],
    required: true
  }
},
description:String,
keywords:{
  type:[String]
},
 openingTime:
  [
    {
      day:
      {type:String,
        enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      },
      openingHours:Number,
      closingHours:Number
    }
  ]
  


});

const Market= mongoose.model("Market", marketSchema)

