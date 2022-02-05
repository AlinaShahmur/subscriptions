const express = require('express');
const router = express.Router();
const subscriptionBL = require('../models/BL/subscriptionBL')
const { authenticateToken } = require('../middleware')

router.get('/member/:id', authenticateToken, (req,res) => {
    let memberId= req.params.id
    subscriptionBL.getAllSubWithMovieData(memberId).then(data => {
        res.send(data)
    })
})

router.get('/movie/:id', authenticateToken, (req,res) => {
    let movieId= req.params.id
    subscriptionBL.getAllSubWithMembersData(movieId).then(data => {
        res.send(data)
    })
})

router.post('/', authenticateToken, (req, res) => {     
    let newSub = req.body
    console.log(newSub)
    subscriptionBL.createNewSubscription(newSub).then(data => {
        res.send(data)
    })
})

module.exports = router