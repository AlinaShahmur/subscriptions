import { NavLink } from "react-router-dom";
import { useRouteMatch } from "react-router";
import './SubNavbar.css'

function SubNavbar(props) {
    let { path } = useRouteMatch();
    return (
        <nav className = "navbar-movie">
            <NavLink activeClassName = 'active' exact  to = {`${path}/`} >All {props.subjects}</NavLink>
            <NavLink activeClassName = 'active' exact  to = {`${path}/create`} >Create</NavLink>
        </nav>
    )
}

export default SubNavbar