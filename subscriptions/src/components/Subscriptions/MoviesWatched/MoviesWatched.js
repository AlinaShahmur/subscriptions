import { useEffect, useState } from "react"
import dataFromServer from "../../../utils/dataFromServer"
import './MoviesWatched.css'
import NewMovie from "../NewMovie/NewMovie"
import {Link} from 'react-router-dom'

function MoviesWatched(props) {
    const [subscriptions, setSubscriptions] = useState([])
    const [isAddMovieOpen, setIsAddMovieOpen] = useState(false)
    const [status, setStatus] = useState('')
    useEffect(() => {       
        dataFromServer.getById('http://localhost:8000/api/subscriptions/member', props.memberId).then(data => {
            let subs = data.data.map(item => {
                return {...item, date: `${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}/${new Date(item.date).getFullYear()}`}
            })
            setSubscriptions(subs)
        }) 
    },[props.memberId, status])
    const addNewStatus = (message) => {
        setStatus(message)
    }
    const btnAddMovClasses = isAddMovieOpen ? 'add-movie-btn btn isopen' : 'btn add-movie-btn'
    let subscriptionsContent = subscriptions.length > 0 ? (
                                                                                        <table>
                                                                                                    <thead>
                                                                                                            <tr>
                                                                                                                <th>Movie title</th>
                                                                                                                <th>Date</th>
                                                                                                            </tr>
                                                                                                        </thead>
                                                                                                        <tbody>
                                                                                                            {subscriptions.map(item => (    <tr key = {item._id}>
                                                                                                                                                <td><Link to = {`/movies?movie=${item.movie._id}`}>{item.movie.name}</Link></td>
                                                                                                                                                <td>{item.date}</td>
                                                                                                                                            </tr>
                                                                                                            ))}

                                                                                                        </tbody>
                                                                                                    </table>) : <p>There are no subscriptions</p>
    return (
           <div className = 'movies-watched'>
               <h3>Movies Watched</h3>
               <button type = 'button' className = {btnAddMovClasses} onClick = {() => setIsAddMovieOpen(!isAddMovieOpen)}>Add New Movie<i className="fas fa-sort-down"></i></button>
               <p>{status}</p>
               <NewMovie addStatus = {addNewStatus} isVisible = {isAddMovieOpen} memberId = {props.memberId} subscriptions = {subscriptions}/>
               {subscriptionsContent}
           </div> 
    )
}

export default MoviesWatched