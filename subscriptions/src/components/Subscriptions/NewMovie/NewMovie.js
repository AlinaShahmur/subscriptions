import './NewMovie.css'
import { useState } from 'react'
import dataFromServer from '../../../utils/dataFromServer'
import { useSelector } from 'react-redux'

function NewMovie(props) {
    const [choosenMovieId, setChoosenMovieId] = useState('')
    const [choosenDate, setChoosenDate] = useState('')
    let addMovieSubClasses = props.isVisible ? 'add-movie-sub visible' : 'add-movie-sub'
    const  movies = useSelector(state => state.movies.movies)
    const newMovieSubmitHandler = (e) => {
        props.addStatus('')
        e.preventDefault()
        if (choosenMovieId && choosenDate) {
            let newSub = {
                movie: choosenMovieId,
                member: props.memberId,
                date: choosenDate
            }
            setChoosenMovieId('')
            setChoosenDate('')
            dataFromServer.addItem("http://localhost:8000/api/subscriptions", newSub).then(data => {
                props.addStatus(data.data)
            }).catch(err => props.addStatus(err))
        }
    }
    let watchedMovies = props.subscriptions.map(item => item.movie.name)
    return (
        <div className = {addMovieSubClasses}>
            <h4>Add new Movie</h4>
            <form onSubmit = {newMovieSubmitHandler}>
                <select onChange = {(e) => setChoosenMovieId(e.target.value)} value = {choosenMovieId} className = 'form-control'>
                        <option>Select Movie</option>
                        {movies.filter(item => !watchedMovies.includes(item.name)).map(item => (
                            <option key = {item._id} value = {item._id}>{item.name}</option>
                        ))}
                </select>
                <input type = 'date' onChange = {(e) => setChoosenDate(e.target.value)} value = {choosenDate}/>
                <button type = 'submit' className = 'btn'>Subscribe</button>
            </form>

        </div>
    )
}

export default NewMovie