const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  marketname:
{
  type:String,
  required: true,
},
img:
,
markettype:{
  type:String,
  enum:["Farmers market", "Covered market", "Street-Food-Market", "Flea Market"]
},
address:{
  type:String,
  required:true,
},
description:String,
keywords:{
  type:String,
  enum:[...],
},
day:{
  type:String,
  enum:["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
},
openingHours:Number,
});

const Market= mongoose.model("Market", marketSchema)
