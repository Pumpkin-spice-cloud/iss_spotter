const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss.js');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);


// });

// fetchCoordsByIP('66.203.199.230', (error, data) => {
//   console.log('Error', error, '\n', data);
// });

// fetchISSFlyOverTimes({lat: 43.73660, lon: -79.54010}, (error, passTimes) => {
//   console.log('Error', error, passTimes);
// });

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  if (error === null) {
    for (let i = 0; i < passTimes.length; i++) {
      let temp = new Date(passTimes[i].risetime * 1000 - 60 * 60 * 5 * 1000);
      temp = temp.toString();
      let date = `Next pass at ${temp.slice(0, 28)} -0500 (Eastern Standard Time) for ${passTimes[i].duration} seconds!`;
      
      
      console.log(date);
    }
    // console.log(typeof(passTimes));
    // console.log(passTimes[1]);
    //let output = JSON.parse(passTimes);
    //console.log(output);

    return passTimes;
  }
  // success, print out the deets!
  //console.log(passTimes);
});