const request = require('request');
const fetchMyIP = function (callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let output = JSON.parse(body);
    //console.log(output);
    callback(null, output.ip);

  });
};

const fetchCoordsByIP = function (ip, callback) {
  request(`http://ipvigilante.com/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when coords. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let output = JSON.parse(body);

      callback(null, {latitude: output.data.latitude, longitude: output.data.longitude});
    }
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${(coords.latitude)}&lon=${(coords.longitude)}`, (error, response, body) => {
    // console.log(error, 'check');
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when ISS fly over times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      let output = JSON.parse(body);
      output = (output.response);
      callback(null, output);

    }
  });
};

const nextISSTimesForMyLocation = function (callback) {

  let ip = fetchMyIP((error, outputIP) => {
    if (error === null) {
      fetchCoordsByIP(outputIP, (error, outputcoords) => {
        if (error === null) {
          let outputObject = {latitude:0, longitude:0};
          outputObject.latitude = parseFloat(outputcoords.latitude);
          outputObject.longitude = parseFloat(outputcoords.longitude);
          
          fetchISSFlyOverTimes(outputObject, callback);
        }
      });
    }
  });



  //fetchCoordsByIP(ip, callback);


}

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };