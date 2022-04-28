//Foundation - importing the modules
const express = require('express');
const app = express();
const logger = require("morgan");
const request = require('request');
const key = require('./config/keys') // getting access to the api key

app.set("view engine", "ejs");
app.use(express.static("public"));  // import CSS
app.use(logger("dev"));

// Route handlers
app.get('/', (req, res) => {
    res.render("home");
});

// Need endpoint
//endpoint composed of two things: baseUrl and route
//https://api.themoviedb.org/3/search/movie?api_key=&query=Avengers&page=1&include_adult=false

const baseUrl = "https://api.themoviedb.org/3";

app.get('/getMovies', (req, res) => {
    // console.log(req)
    let route = `search/movie?api_key=${key.tmdb_key}&query=${req.query.movietitle}&page=1&include_adult=false`
    let endpoint = `${baseUrl}/${route}`

    request(endpoint, (error, response, body) => {
        let parsedData = JSON.parse(body);
        console.log(parsedData.results);
        res.render("results", {data: parsedData.results});
    })
});

// Listening to the port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is on port ${PORT}.`)
})