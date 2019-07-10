const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const marketSchema = new Schema({
  marketname: {
    type: String,
    required: true
  },
  market: {
    type: Object,
    set: ({ marketType, marketImg }) => {
      console.log(marketType);
      switch (marketType) {
        case "Farmers market":
          marketImg = "/images/farmersmarket_photo.jpg";
          break;
        case "Covered market":
          marketImg = "/images/markthalle-photo.jpg";
          break;
        case "Street-Food-Market":
          marketImg = "/images/streetfoodmarket_photo.jpg";
          break;
        case "Flea market":
          marketImg = "/images/fleamarket-photo.jpg";
          break;
        default:
          marketImg = "/images/markthalle-photo.jpg";
          break;
      }
      console.log(marketImg);
      return {
        marketType,
        marketImg
      };
    }
  },

  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point"
    },
    coordinates: {
      type: [Number, Number],
      required: true
    }
  },
  description: String,
  keywords: {
    type: Array
  },
  openingTime: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ]
      },
      openingHours: Number,
      closingHours: Number
    }
  ]
});

const Market = mongoose.model("Market", marketSchema);

module.exports = Market;
