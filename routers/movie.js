const mongoose = require('mongoose');

const Movie = require('../models/movie');

module.exports = {
    getAll: function(req, res){
        Movie.find().populate('actors').exec(function(err, movies){
            if (err) return res.status(400).json(err);

            res.json(movies);
        });
    },

    createOne: function(req, res){
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId;
        Movie.create(newMovieDetails, function(err, movie){
            if (err) return res.status(400).json(err);

            res.json(movie);
        });
    },

    getOne: function(req,res){
        Movie.findOne({_id: req.params.id})
            .populate('actors')
            .exec(function (err, movie){
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.json(movie);
        });
    },

    updateOne: function(req, res){
        Movie.findOneAndUpdate({_id: req.params.id}, req.body, 
        function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.json(movie);
        })
    },

    deleteOne: function(req, res){
        Movie.findOneAndRemove({_id: req.params.id}, function (err){
            if (err) return res.status(400).json(err);

            res.json();
        });
    },

    removeActor: function(req, res){
        Movie.findOne({_id: req.params.movieid}, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({_id: req.params.actorid}, function (err, actors) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movies.actors.pull(actor._id); // don't know if this works
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            });
        });
    },

    addActor: function(req, res) {
        Movie.findOne({_id: req.params.id}, function(err, movie){
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({_id: req.body.id}, function(err, actor){
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actor.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.json(movie);
                });
            });
        });
    },
    
    getRange: function(req, res) {
        let y1 = parseInt(req.params.y1);
        let y2 = parseInt(req.params.y2);
        Movie.find({ year: {$lte: y1, $gte: y2}}, function (err, movies) {
            if (err) return res.status(400).json(err);
            else res.json(movies);
        });
    }
}