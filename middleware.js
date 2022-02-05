let jwt = require('jsonwebtoken');
let RSA_PRIVATE_KEY = process.env.RSA_PRIVATE_KEY || 'subscriptionsserverkey'

exports.authenticateToken = (req,res,next) => {
    var token  = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).send({auth: false, message: "no token provided"})
    }
    jwt.verify(token, RSA_PRIVATE_KEY, function(err, user) {
        if (err) {
            return res.status(500).send({auth: false, message: "Failed to authenticate token"})
        }
        req.user = user
        next()
    })
}

