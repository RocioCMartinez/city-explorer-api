'use strict';
const axios = require('axios');

async function getMovies (request, response, next){
  try {
    let searchedMovie = request.query.searchQuery;

    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchedMovie}`;

    let dataFromAxios = await axios.get(movieURL);

    let dataToSend = dataFromAxios.data.results.map(movieObj => new Movie (movieObj));

    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObj){
    this.title= movieObj.title;
    this.overview= movieObj.overview;
  }
}


module.exports = getMovies;
