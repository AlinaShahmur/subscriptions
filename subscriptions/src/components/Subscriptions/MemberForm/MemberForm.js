import useInput from "../../../hooks/useInput";
import services from "../../../utils/services";
import Input from "../../UI/Input/Input";
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import dataFromServer from "../../../utils/dataFromServer";

function MemberForm(props) {
    const params = useParams()
    const [respStatus, setRespStatus] = useState('')
    const [city, setCity] = useState({value: '', isTouched: false})
    const [isFormSending, setIsFormSending] = useState(false)
    const {
        enteredValue: memberNameValue,
        isTouched: isMemberNameTouched,
        isInputValid: isNameValid,
        inputChangeHandler: memberNameChangeHandler,
        setValue: setMemberNameValue,
        reset: resetMemberName
    } = useInput(services.textValidator)

    const {
        enteredValue: memberEmailValue,
        isTouched: isMemberEmailTouched,
        isInputValid: isEmailValid,
        inputChangeHandler: memberEmailChangeHandler,
        setValue: setMemberEmailValue,
        reset: resetMemberEmail
    } = useInput(services.emailValidator)
    useEffect(() => {
        if (props.action === 'edit') {
            let id = params.id
            dataFromServer.getById('http://localhost:8000/api/members', id).then(data => {
                let member = data.data
                setMemberNameValue(member.name)
                setMemberEmailValue(member.email)
                setCity({value: member.city, isTouched: false})
            })
        }
    },[props.action, params.id])
    const resetData = () => {
        resetMemberName();
        resetMemberEmail();
        setCity({value:'', isTouched: false})
    } 
    const submitHandler = (e) => {
        e.preventDefault()
        if (isFormValid) {
            setIsFormSending(true)
            let memberToSend = {
                name: memberNameValue,
                email: memberEmailValue,
                city: city.value
            }
            if (props.action === 'edit') {
                dataFromServer.updateItem('http://localhost:8000/api/members', params.id, memberToSend).then(data => {
                    setRespStatus(data.data)
                    setIsFormSending(false)
                }).catch(err => {
                    setRespStatus(err)
                    setIsFormSending(false)
                })
            } else if (props.action === 'add') {
                dataFromServer.addItem('http://localhost:8000/api/members', memberToSend).then(data => {
                    setRespStatus(data.data)
                    resetData()
                    setIsFormSending(false)
                }).catch(err => {
                    setRespStatus(err)
                    setIsFormSending(false)
                })
            }        
        }
    }
    let isFormTouched = isMemberNameTouched || isMemberEmailTouched || city.isTouched
    let formClasses = isFormSending ? '_sending' : ''
    let isFormValid = isNameValid && isEmailValid && city.value !== ''
    let isDisabled = props.action === 'edit' ? !isFormTouched : !isFormValid
    return (
        <form onSubmit = {submitHandler} className = {formClasses}>
        <p>{respStatus}</p>
        <Input type = 'text' 
                id = "movieName" 
                label = "Name" 
                value = {memberNameValue} 
                onChange = {memberNameChangeHandler}/>
        <Input type = 'email' 
                id = "movieEmail" 
                label = "Email" 
                value = {memberEmailValue} 
                onChange = {memberEmailChangeHandler}/>
        <div>
            <select onChange = {(e) => setCity({value: e.target.value, isTouched: true})} value = {city.value}>
                <option value = ''>Select city</option>
            {services.cities.map((item, index) => (<option key = {index} value = {item}>{item}</option>))} 
            </select>
        </div>
        <button type = 'submit' className = 'btn' disabled = {isDisabled}>Save Changes</button>
    </form>
    )
}

export default MemberForm