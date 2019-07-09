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
      if (!marketImg)
        switch (marketType) {
          case "Farmers Market":
            marketImg = "";
            break;
          case "Covered Market":
            marketImg = "";
            break;
          case "Street-Food-Market":
            marketImg = "";
            break;
          case "Flea Market":
            marketImg = "";
            break;
        }
      return {
        marketType,
        marketImg
      };
    }
  },

  // markettype: {
  //   type: String,
  //   enum: [
  //     "Farmers market",
  //     "Covered market",
  //     "Street-Food-Market",
  //     "Flea Market"
  //   ]
  // },
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
