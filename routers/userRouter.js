const express = require('express')
const router = express.Router();
const userBL = require('../models/BL/userBL')
let jwt = require('jsonwebtoken');
const RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || 'subscriptionsserverkey'

router.route('/')
.get((req,res) => {
    userBL.getAllUsers().then(data => res.json(data))
})

router.route('/login')
.post(async function(req, res)  {
    let obj = req.body;
    let response = await userBL.userIsExist(obj.userName, obj.password)
    if (response.length > 0) {
        let user = response[0] 
        let userid = user._id
        var token = jwt.sign(
            {id: userid},
            RSA_PRIVATE_KEY,
            {expiresIn: 7200}
        )
        res.status(200).send({token: token, user: user})
    } else {
        res.status(401).send('The username/password are not valid')
    }
})



module.exports = router