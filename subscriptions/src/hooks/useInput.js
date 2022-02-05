import { useState } from "react"



const useInput = (validatorFunc) => {
    const [inputState, setInputState] = useState({value: '', isTouched: false})
    let isInputValid = validatorFunc(inputState.value);

    const setValue = (value) => {
        setInputState({value: value, isTouched:false})
    }

    const inputChangeHandler = (e) => {
        setInputState({value: e.target.value, isTouched:true})
    }
    const reset = () => {
        setInputState({value: '', isTouched:false})
    }

    return {
        enteredValue: inputState.value,
        isTouched: inputState.isTouched,
        isInputValid,
        inputChangeHandler,
        setValue,
        reset
    }
}

export default useInput