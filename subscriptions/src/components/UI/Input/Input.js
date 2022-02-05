
import classes from './Input.module.css'

function Input(props) {
  return (
    <div className = {classes.input}>
        <label htmlFor = {props.id}>{props.label}</label>
        <input 
            type = {props.type} 
            onChange = {props.onChange}
            id = {props.id}
            value = {props.value}
            placeholder = {props.placeholder}
            />
    </div>
  );
}

export default Input;
