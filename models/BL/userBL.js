const User = require('../mongoose/userModel')


exports.getAllUsers = () => {
    return new Promise((resolve, reject) => {
        User.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.userIsExist = (name, password) => {
    return new Promise((resolve, reject) => {
        User.find({userName: name, password: password}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}
