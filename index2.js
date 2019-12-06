//const {fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes} = require ('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised.js');

const printPassTimes = function (passTimes) {
  for (let i = 0; i < passTimes.length; i++) {
    let temp = new Date(passTimes[i].risetime * 1000 - 60 * 60 * 5 * 1000);
    temp = temp.toString();
    let date = `Next pass at ${temp.slice(0, 28)} -0500 (Eastern Standard Time) for ${passTimes[i].duration} seconds!`;


    console.log(date);
  }
}


nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });