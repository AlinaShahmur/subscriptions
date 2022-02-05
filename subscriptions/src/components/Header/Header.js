import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import useWindowWidth from "../../hooks/useWindowSize"
import Toggler from "../UI/Toggler/Toggler"
import classes from './Header.module.css'


function Header(props) {
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn)
    const fullUserName = useSelector(state => state.auth.fullName)
    const [isOpen, setIsOpen] = useState(false)
    const windowWidth = useWindowWidth();
    const isSmallDisplay = windowWidth < 768
    const togglerHandler = (isTogglerChecked) => {
        setIsOpen(isTogglerChecked)
    }
    return (
            <nav className = {classes.navbar}>                               
               <ul>
                    <div className = {classes.logo}>Movies Subscriptions</div>
                    <div className = {classes["links"]} style = {{display: !isSmallDisplay ? 'flex' : isOpen ? 'flex' : 'none'}}>                       
                        {isLoggedIn &&  <NavLink activeStyle = {{color: '#009999', fontWeight: 700}}  to = '/movies' >Movies</NavLink>}
                        {isLoggedIn && <NavLink activeStyle = {{color: '#009999', fontWeight: 700}} to = '/subscriptions'>Subscriptions</NavLink>}
                    </div>
                    <div className = {classes["log-info"]} style = {{display: !isSmallDisplay ? 'flex' : isOpen ? 'flex' : 'none'}}>
                        {isLoggedIn &&  <p>{fullUserName}</p>  }
                        {isLoggedIn &&  <button className = {classes['btn-login']} onClick = {props.logoutHandler}>Log out</button>}
                    </div> 
                </ul> 
                {isLoggedIn && <Toggler onToggle = {togglerHandler}/> }                       
            </nav>
    )
}

export default Header