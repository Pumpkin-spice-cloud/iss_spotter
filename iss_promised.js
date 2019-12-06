const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api.ipify.org?format=json');
}
const fetchCoordsByIP = function(input) {
  const ip = JSON.parse(input).ip;
  return request(`http://ipvigilante.com/json/${ip}`);
}

const fetchISSFlyOverTimes = function(coords) {
  const {latitude, longitude} = JSON.parse(coords).data;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
  
}
const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((flyTime) => {
      const { response } = JSON.parse(flyTime);
      return response;
    });
};

//module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
module.exports = { nextISSTimesForMyLocation };
