import { withRouter } from "react-router"
import React, { useEffect } from "react"

const parseJwt = (token) => {
    try {
        return JSON.parse(window.atob(token.split('.')[1]))
    } 
    catch(e){
        return null
    }
}

const validateToken = (token, logoutHandler) => {
    if (token) {
        let decodedJwt = parseJwt(token)
        if (decodedJwt.exp * 1000 < Date.now()) {            
            logoutHandler()
        }
    }
}

function AuthVerify(props){
    
    let token = window.localStorage.getItem('token');
    useEffect(() => {
        validateToken(token, props.logout)
    },[props.logout])
    props.history.listen(() => {
        validateToken(token, props.logout)
    })
    return (
        <div></div>
    )
}

export default withRouter(AuthVerify) 