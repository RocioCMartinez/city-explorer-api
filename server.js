'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

// Create Server
const app = express(); // app === my server

// middleware
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



//Catch all endpoint - last endpoint defined
app.get('*', (request, response) =>{
  response.status(404).send('Sorry, page not found');
});

//Error handling/ plug&play from express docs
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});


