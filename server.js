'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

let data = require('./data/weather.json');


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


app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstname;
  let userLastName = request.query.lastname;

  response.status(200).send(`Hello ${userFirstName} ${userLastName}`);
});

app.get('/weather', (request, response, next) => {
  try{
    let queryCity = request.query.city_name;

    let foundCity = data.find(element => element.city_name.toLowerCase() === queryCity.toLowerCase());

    let forecastWeather = foundCity.data.map(element => {
      let high = element.high_temp;
      let low = element.low_temp;
      let description = `Low of ${low}, high of ${high}, with ${element.weather.description}`;
      return new Forecast(element.valid_date, description);
    });

    // let cityToSend = new Forecast(foundCity);
    response.status(200).send(forecastWeather);

  } catch (error) {
    next(error);
  }
});

class Forecast {
  constructor(date, des){

    this.date = date;
    this.description = des;

  }
}


//Catch all endpoint - last endpoint defined
app.get('*', (request, response) =>{
  response.status(404).send('Sorry, page not found');
});

//Error handling/ plug&play from express docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


