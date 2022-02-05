const Movie = require('../mongoose/movieModel');
const Subscription = require('../mongoose/subscriptionModel')


exports.getAllMovies = () => {
    return new Promise((resolve, reject) => {
        Movie.find({}, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getMovie = (id) => {
    return new Promise((resolve, reject) => {
        Movie.findById(id, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.addMovie = (newMovie) => {
    return new Promise((resolve, reject) => {
        let movie = new Movie({
            name: newMovie.name,
            premiered: newMovie.premiered,
            genres: newMovie.genres,
            img: newMovie.img
        })
        movie.save((err) => {
            if (err) {
                reject(err)
            } else {
                resolve('created')
            }
        })
    })
}

exports.deleteMovie = (movieId) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndDelete(movieId, (err) => {
            if (err) {
                reject(err)
            } else {
                Subscription.deleteMany({movie: movieId }, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('Successfully deleted')
                    }
                }) 
            }
        })
    })
}

exports.updateMovie = (movieId, obj) => {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(movieId, {
            name: obj.name,
            genres: obj.genres,
            premiered: obj.premiered,
            src: obj.src
        }, (err) => {
            if (err) {
                reject(err)
            } else {
                resolve("Successfully updated")
            }
        })
    })
}