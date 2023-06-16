'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./modules/weather');
const getMovies = require('./modules/movies')



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


app.get('/weather', getWeather);

app.get('/movies', getMovies);


//Catch all endpoint - last endpoint defined
app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

//Error handling/ plug&play from express docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


