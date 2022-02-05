import { useState } from 'react'
import classes from './Toggler.module.css'

function Toggler(props) {
    const [checked, setChecked] = useState(false)
    const changeHandler = () => {
        setChecked(!checked)
        props.onToggle(!checked)
    }
    return (
        <div className = {classes.toggler}>
            <input type = 'checkbox' id = 'toggler-checkbox' defaultChecked={checked} onChange = {changeHandler}/>
            <label htmlFor = 'toggler-checkbox' id = 'toggler-label'></label>
        </div>
    )
}

export default Toggler