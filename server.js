'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const axios = require('axios');



// App is my server
const app = express();

// Middleware
app.use(cors());

// Define Port for server
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`We are running on ${PORT}!`));

// Endpoints (routes) // URL, Callbk fn

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});



app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;


    // let searchQuery = request.query.searchQuery;


    let weatherURL=`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHERBIT}`;
    let weatherDataAxios = await axios.get(weatherURL);



    let forecastWeather = weatherDataAxios.data.data.map(element => {


      return new Forecast( element);
    });
    response.status(200).send(forecastWeather);



  } catch (error) {
    next(error);
  }
});



class Forecast {
  constructor(element) {

    this.date = element.valid_date;
    this.high = element.high_temp;
    this.low = element.low_temp;
    this.description = `Low of ${this.low}, high of ${this.high}, with ${element.weather.description}`;

  }
}


//Catch all endpoint - last endpoint defined
app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

//Error handling/ plug&play from express docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


