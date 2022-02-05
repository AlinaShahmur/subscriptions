import { useState } from "react"
import { Link } from "react-router-dom"
import dataFromServer from "../../../utils/dataFromServer"
import Card from "../../UI/Card/Card"
import MoviesWatched from "../MoviesWatched/MoviesWatched"
import './Member.css'

function Member(props) {
    const [isDeleted, setIsBeDeleted] = useState(false)
    const deleteMember = () => {
        dataFromServer.deleteItem('http://localhost:8000/api/members', props.id).then(data => {
            setIsBeDeleted(true)
        })
    }
    let contentMember = isDeleted ? <p>Successfully Deleted</p> : (  <Card>
                                                                                <h2>{props.name}</h2>
                                                                                <p>Email: {props.email}</p>
                                                                                <p>City: {props.city}</p>
                                                                                <Link to = {`/subscriptions/edit/${props.id}`} className = 'btn link-btn'>Edit</Link>
                                                                                <button type = 'button' onClick = {deleteMember} className = 'btn'>Delete</button>
                                                                                <MoviesWatched memberId = {props.id}/>            
                                                                        </Card>)
    return (
        <div className = 'member'>
            {contentMember}
        </div>

    )
}

export default Member