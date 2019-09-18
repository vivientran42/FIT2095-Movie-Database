const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/movies', function(err){
    if (err) {
        return console.log('Mongoose - connection error:', err)
    }
    console.log('Connected Successfully');
});

//actors
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/movies/:id'), actors.removeMovie;
app.post('/actors/movies:id'), actors.addMovie;

//movies
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/actors/:id', movies.removeActor);
app.post('/movies/actors/:id', movies.addActor);
app.get('/movies/:y1/:y2'), movies.getRange;

app.listen(8080);

