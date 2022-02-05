import {  Route, Switch } from "react-router-dom"
import SubNavbar from "../UI/SubNavbar/SubNavbar"
import AllMovies from "./AllMovies/AllMovies"
import CreateMovie from "./CreateMovie/CreateMovie"
import EditMovie from "./EditMovie/EditMovie"


function Movies() {
    return (
        <div>
            <SubNavbar subjects = 'Movies'/>
            <Switch>
                <Route exact path = '/movies' component = {AllMovies}/>
                <Route exact path = '/movies/edit/:id' component = {EditMovie}/>
                <Route exact path = '/movies/create' component = {CreateMovie}/> 
            </Switch>          
        </div>

    )
}

export default Movies