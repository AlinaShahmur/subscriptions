const Member = require('../mongoose/memberModel');
const Subscription = require('../mongoose/subscriptionModel')
exports.getAllMembers = () => {
    return new Promise((resolve, reject) => {
        Member.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getMember = (id) => {
    return new Promise((resolve, reject) => {
        Member.findById(id, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.createMember = (obj) => {
    return new Promise((resolve, reject) => {
        let newMember = new Member({
            name: obj.name,
            email: obj.email,
            city: obj.city
        })
        newMember.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve('Successfully created')
            }
        })
    })
}

exports.updateMember = (obj) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndUpdate(id, {
            name: obj.name,
            email: obj.email,
            city: obj.city
        }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Successfully updated")
            }
        })
    })
}


exports.deleteMember = (id) => {
    return new Promise((resolve, reject) => {
        Member.findByIdAndDelete(id, (err) => {
            if (err) {
                reject(err)
            } else {
                Subscription.deleteMany({member: id}, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve("Successfully deleted")
                    }
                })
            }
        })
    })
}