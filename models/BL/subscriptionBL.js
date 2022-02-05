const Subscription = require('../mongoose/subscriptionModel');
const ObjectId = require('mongodb').ObjectId; 


exports.getAllSubWithMembersData = (movieId) => {
    return new Promise((resolve, reject) => {
       Subscription.find({movie: movieId}).populate('member').exec((err, data) => {
           if (err) {
               reject(err)
           } else {
               resolve(data)
           }
       })
    })
}

exports.getAllSubWithMovieData = (memberId) => {
    return new Promise((resolve, reject) => {
       Subscription.find({member: memberId}).populate('movie').exec((err, data) => {
           if (err) {
               reject(err)
           } else {
               resolve(data)
           }
       })
    })
}

exports.createNewSubscription = (obj) => {
    return new Promise((resolve, reject) => {
        let newSub = new Subscription({
            movie: obj.movie,
            member: obj.member,
            date: obj.date
        })
        newSub.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve('Successfully created')
            }
        })
    })
}