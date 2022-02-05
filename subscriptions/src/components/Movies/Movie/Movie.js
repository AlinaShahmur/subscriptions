import './Movie.css'
import Card from '../../UI/Card/Card'
import { useEffect, useState } from "react";
import SubscriptionsWatched from "../SubscriptionsWatched/SubscriptionWatched";
import { Link } from "react-router-dom";
import dataFromServer from "../../../utils/dataFromServer";

function Movie(props) {
    const [isSuscriptionsOpen, setIsSuscriptionsOpen] = useState(false)
    const [movieId, setMovieId] = useState('')
    const [willBeDeleted, setWillBeDeleted] = useState(false)
    useEffect(() => {
        setMovieId(props.id)
    },[props.id])
    const btnSubsClasses = isSuscriptionsOpen ? 'subs-watched isopen' : 'subs-watched'
    const deleteMovie = () => {
        dataFromServer.deleteItem('http://localhost:8000/api/movies', movieId).then(data => {
            setWillBeDeleted(true)
        })
    }
    const movieContent = willBeDeleted ? <p>Successfully Deleted</p> : (
                <Card>
                    <div className = 'movie-content'>
                        <div className = 'movie-info'>
                            <div className = 'movie-info-text'>
                                <h2>{props.title}</h2>
                                <h3>Premierred Year: <span>{props.year}</span></h3>
                                <h3>Genres: </h3>
                                <ul className = 'genres'>
                                    {props.genres.map((genre, index) => <li key = {index}>{genre}</li>)}
                                </ul>
                            </div>   
                            <div className = 'img-container'> 
                                <img src = {props.img} alt = 'img-poster'/>
                            </div>                          
                        </div>  
                        <button type = 'button' className = {btnSubsClasses} onClick = {() => setIsSuscriptionsOpen(!isSuscriptionsOpen)}>Subscriptions Watched <i className="fas fa-sort-down"></i></button>
                        <SubscriptionsWatched movieId = {props.id} isVisible = {isSuscriptionsOpen}/>     
                        <Link to = {`/movies/edit/${props.id}`} className = "btn link-btn">Edit</Link>
                        <button type = 'button' onClick = {deleteMovie} className = 'btn'>Delete</button>
                    </div>
                </Card>
    )
    return (
            <div className = 'movie'>
                {movieContent}
            </div>

    )
}

export default Movie