const express = require('express');
const router = express.Router();
const movieBL = require('../models/BL/movieBL')
const { authenticateToken } = require('../middleware')

router.get('/', authenticateToken, (req, res) => {
    movieBL.getAllMovies().then(data => {
        res.send(data)
    })
})

router.get('/:id', authenticateToken, (req, res) => {
    movieBL.getMovie(id).then(data => {
        res.send(data)
    })
})

router.post('/', authenticateToken, (req, res) => {
    let obj = req.body;
    movieBL.addMovie(obj).then(data => {
        res.send(data)
    })
})


router.delete('/:id', authenticateToken, (req, res) => {
    let id = req.params.id;
    movieBL.deleteMovie(id).then(data => {
        res.send(data)
    })
})

router.put('/:id', authenticateToken, (req,res) => {
    let id = req.params.id;
    let updatedMovie = req.body;
    movieBL.updateMovie(id, updatedMovie).then(data => {
        res.send(data)
    })
})

module.exports = router