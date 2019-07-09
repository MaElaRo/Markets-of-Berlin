const mongoose = require("mongoose");
const Markets = require("../models/Markets");

mongoose.connect("mongodb://localhost/markets-of-berlin", {
  useNewUrlParser: true
});

const data = require("../markets.js")[0].index;

function filterWithoutCoordinates(data) {
  return data.filter(elem => elem.longitude !== "" || elem.latitude !== "");
}

const arr0 = filterWithoutCoordinates(data);

// console.log(arr0);

let coordinates = [];

function filterMarkets(data) {
  return data
    .filter(
      elem =>
        Number(elem.longitude.replace(",", ".")) > 13.091 &&
        Number(elem.longitude.replace(",", ".")) < 13.753 &&
        Number(elem.latitude.replace(",", ".")) > 52.343 &&
        Number(elem.latitude.replace(",", ".")) < 52.676
    )
    .map(obj => {
      const tages = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ];

      const opening = obj.tage
        .replace(/mo/i, "Monday")
        .replace(/di/i, "Tuesday")
        .replace(/mi/i, "Wednesday")
        .replace(/do/i, "Thursday")
        .replace(/fr/i, "Friday")
        .replace(/sa/i, "Saturday")
        .replace(/so/i, "Sunday")
        .replace(/\n/g, " ")
        .split(/[\s\,]/)
        .filter(el => tages.includes(el))
        .map(ele => {
          return {
            day: ele,
            openingHours: parseInt(obj.zeiten.split(" - ")[0]),
            closingHours: parseInt(obj.zeiten.split(" - ")[1])
          };
        });

      if (opening.find(el => isNaN(el.openingHours))) return;

      return {
        marketname: obj.location.replace(/\n/g, " "),
        market: {
          marketType:
            obj.location.includes("Wochenmarkt") ||
            obj.location.includes("Wochenmärkte") ||
            obj.location.includes("Ökomarkt")
              ? "Farmers market"
              : obj.location.includes("Trödelmarkt") ||
                obj.location.includes("Flohmarkt")
              ? "Flea market"
              : obj.location.includes("Markthalle")
              ? "Covered market"
              : 0,
          marketImg: {
            marketType:
            obj.location.includes("Wochenmarkt") ||
            obj.location.includes("Wochenmärkte") ||
            obj.location.includes("Ökomarkt")
              ? "Farmers market"
              : obj.location.includes("Trödelmarkt") ||
                obj.location.includes("Flohmarkt")
              ? "Flea market"
              : obj.location.includes("Markthalle")
              ? "Covered market"
              : 0,
          },
        },
        location: {
          coordinates: [
            Number(obj.latitude.replace(",", ".")),
            Number(obj.longitude.replace(",", "."))
          ]
        },
        description: obj.bemerkungen,
        openingTime: opening
      };
    });
}

const fixedMarkets = filterMarkets(data).filter(
  market => market && market.openingTime.length
);

Markets.deleteMany()
  .then(() => {
    Markets.insertMany(fixedMarkets).then(data => {
      console.log(data);

      mongoose.connection.close();
    });
  })
  .catch(err => {
    console.log("Error: ", err);
  });
