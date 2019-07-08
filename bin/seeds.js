const mongoose = require("mongoose");
const Markets = require("../models/Markets");

mongoose.connect("mongodb://localhost/markets-of-berlin", {
  useNewUrlParser: true
});

const data = require("../markets.js")[0].index


function filterWithoutCoordinates(data){
  return data.filter(elem => elem.longitude!=="" || elem.latitude!=="")
}

const arr0 = filterWithoutCoordinates(data);

// console.log(arr0);



  let coordinates= [];
  
  function filterMarkets (data) {
  
    return data.filter(elem=>
    Number(elem.longitude.replace(",",".")) > 13.089 
    && Number(elem.longitude.replace(",",".")) < 13.753 
    && Number(elem.latitude.replace(",",".")) > 52.343
    && Number(elem.latitude.replace(",",".")) < 52.676
    ).map(obj=>{return {
      marketname: obj.location.replace(/\n/g, " "),
      market: obj.location.includes("Wochenmarkt"||"Wochenmärkte"||"Ökomarkt") ? "farmers market":
              obj.location.includes("Trödelmarkt"||"Flohmarkt") ? "flea market":
              obj.location.includes("Markthalle")? "covered market" :0,
      
      openingTime:[{
              day : obj.tage.replace(/mo/i,"Monday").replace(/di/i, "Tuesday")
            .replace(/mi/i, "Wednesday").replace(/do/i,"Thursday").replace(/fr/i, "Friday")
            .replace(/sa/i,"Saturday").replace(/so/i, "Sunday").replace(/\n/g, " ")
            .split(/[\s\,]/),
      },
            openingHours:obj.zeiten.match(\d{2}\:\d{2}) - (\d{2}\:\d{2}),
    ],

      location: [obj.latitude, obj.longitude],
      desciption: obj.bemerkungen,
      
       
      }
  })
}
  console.log(filterMarkets(data));