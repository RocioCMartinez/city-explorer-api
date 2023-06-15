'use strict';
const axios = require('axios');


async function getWeather (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT}`;
    let weatherDataAxios = await axios.get(weatherURL);
    if (weatherDataAxios){
      let forecastWeather = weatherDataAxios.data.data.map(element => {
        return new Forecast( element);
      });
      response.status(200).send(forecastWeather);
    } else {
      response.status(500).send('RESULTS NOT FOUND');
    }
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(element) {

    this.date = element.valid_date;
    this.high = element.high_temp;
    this.low = element.low_temp;
    this.description = `Low of ${this.low}, high of ${this.high}, with ${element.weather.description}`;

  }
}


module.exports = getWeather;
