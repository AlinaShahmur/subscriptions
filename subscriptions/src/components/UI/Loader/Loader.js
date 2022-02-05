import classes from './Loader.module.css'

function Loader() {
    return (
        <div className = {classes["lds-roller"]}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
    )
}

export default Loader