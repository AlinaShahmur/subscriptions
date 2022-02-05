import {  Route, Switch } from "react-router-dom"

import SubNavbar from "../UI/SubNavbar/SubNavbar"
import AllMembers from "./AllMembers/AllMembers"
import EditMember from "./EditMember/EditMember"
import NewMember from "./NewMember/NewMember"

function Members(props) {
    return (
        <div>
            <SubNavbar subjects = 'Members'/>
            <Switch>
                <Route exact path = '/subscriptions' component = {AllMembers}/>
                <Route exact path = '/subscriptions/edit/:id' component = {EditMember}/>
                <Route exact path = '/subscriptions/create' component = {NewMember}/> 
            </Switch>          
        </div>

    )
}

export default Members