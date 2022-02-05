const memberBL = require('../models/BL/memberBL');
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware')


router.get('/',authenticateToken, (req, res) => {
    memberBL.getAllMembers().then(data => {
        res.send(data)
    })
})

router.get('/:id', authenticateToken, (req, res) => {
    let id = req.params.id
    memberBL.getMember(id).then(data => {
        res.send(data)
    })
})

router.post('/', authenticateToken, (req, res) => {
    let obj = req.body
    memberBL.createMember(obj).then(data => {
        res.send(data)
    })
})

router.delete('/:id', authenticateToken, (req,res) => {
    let id = req.params.id;
    memberBL.deleteMember(id).then(data => {
        res.send(data)
    })
})

router.put('/:id', authenticateToken, (req,res) => {
    let id = req.params.id;
    let obj = req.body;
    memberBL.updateMember(id, obj).then(data => {
        res.send(data)
    })
})

module.exports = router