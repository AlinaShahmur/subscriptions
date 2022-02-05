import {  useState } from 'react';
import Card from '../UI/Card/Card';
import Input from '../UI/Input/Input';
import Loader from '../UI/Loader/Loader';
import './Login.css'
import { useEffect } from 'react';
import useInput from '../../hooks/useInput';
import services from '../../utils/services';



function Login(props) {
    const {
        enteredValue: username,
        isTouched: isUsernameTouched,
        isInputValid: isUsernameValid,
        inputChangeHandler: usernameChangeHandler,
        reset: usernameReset
    } = useInput(services.textValidator)
    const {
        enteredValue: password,
        isTouched: isPasswordTouched,
        isInputValid: isPasswordValid,
        inputChangeHandler: passwordChangeHandler,
        reset: passwordReset
    } = useInput(services.textValidator)

    const [isSending, setIsSending] = useState(false)
    let isFormValid = isUsernameValid && isPasswordValid

    useEffect(() => {
        setIsSending(props.isSending)
    },[props.isSending])

    const submitHandler = (e) => {
        e.preventDefault();
        if (isFormValid) {
            props.onLogin(username,password)  
            usernameReset();
            passwordReset()
        } 
    }
    let formClasses = isSending ? '_sending' : ''
  return (
    <div className = 'login'>
        <Card>       
            <p>{props.loginError}</p> 
            {props.isLoading && <Loader/>}
            <h1>Login</h1>
            <form onSubmit = {submitHandler} className = {formClasses}>
                <Input  type = 'text' 
                        onChange = {usernameChangeHandler}
                        id = 'username'
                        label = 'Username'  
                        value = {username}
                                        />  
                {!isUsernameValid && isUsernameTouched && <p>The value is not valid</p> }
                <Input  type = 'password' 
                        onChange = {passwordChangeHandler}
                        id = 'password'
                        label = 'Password'  
                        value = {password}
                                        />   
               {!isPasswordValid && isPasswordTouched && <p>The value is not valid</p> }
                <button type = 'submit' className = 'btn' disabled = {!isFormValid}>Login</button>                  
            </form>
        </Card>
    </div>
  );
}

export default Login;
