import { useEffect, useState } from "react"
import './SubscriptionWatched.css'
import server from '../../../utils/dataFromServer'
import {Link} from 'react-router-dom'

function SubscriptionsWatched(props) {
    const [subscriptionData, setSubscriptionData] = useState([])
    useEffect(() => {
        let isMounted = true;
        server.getById('http://localhost:8000/api/subscriptions/movie', props.movieId).then(data => {
            let subs = data.data.map(item => {
                return {...item, date: `${new Date(item.date).getDate()}/${new Date(item.date).getMonth() + 1}/${new Date(item.date).getFullYear()}`}
            })
            if (isMounted) {
                setSubscriptionData(subs)
            }
        })
        return () => { isMounted = false}
    }, [])
    let subClasses = props.isVisible ? 'subscriptions visible' : 'subscriptions'
    let subContent = subscriptionData.length > 0 ? (
                                                                            
                                                                                    <table>
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Member name</th>
                                                                                                    <th>Watching Date</th>
                                                                                                </tr>
                                                                                            </thead>

                                                                                            <tbody>
                                                                                            {subscriptionData.map(item => (<tr key = {item._id}>
                                                                                                                                <td><Link to = {`/subscriptions?memberId=${item.member._id}`}>{item.member.name}</Link></td>
                                                                                                                                <td>{item.date}</td>
                                                                                                                            </tr>
                                                                                            ))}

                                                                                            </tbody>
                                                                                        </table>
                                                                                   
                                                ) : <p>There are no subscriptions</p>
    return (
        <div className = {subClasses}>
            {subContent}
        </div>

    )
}

export default SubscriptionsWatched