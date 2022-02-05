import { useEffect, useState } from "react"
import dataFromServer from "../../../utils/dataFromServer"
import Member from "../Member/Member"


function AllMembers(props) {
    const [members, setMembers] = useState([])
   useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const memberId = urlParams.get('memberId');
       dataFromServer.getItems('http://localhost:8000/api/members').then(data => {
           if (memberId)  {
                let member = data.data.filter(member => member._id === memberId)  
                setMembers(member)
                return
           }  
           setMembers(data.data)       
       })
   },[])
    return (
        <div className = 'all-items'>
        <h1>Subscriptions</h1>
                  {members.map(item => (
                            <Member key = {item._id}
                                    name = {item.name}
                                    email = {item.email}
                                    city = {item.city} 
                                    id = {item._id}/>))}
                            </div>
    )
}

export default AllMembers