import { useEffect, useState } from "react"
import { useParams } from "react-router"
import useInput from "../../../hooks/useInput"
import dataFromServer from "../../../utils/dataFromServer"
import services from "../../../utils/services"
import Input from "../../UI/Input/Input"


function MovieForm(props) {
    const {
        enteredValue: movieNameValue,
        isTouched: isMovieNameTouched,
        isInputValid: nameIsValid,
        inputChangeHandler: nameChangeHandler,
        setValue: setNameValue,
        reset: resetName

    }                   = useInput(services.textValidator)

    const {
        enteredValue: movieYearValue,
        isTouched: isMovieYearTouched,
        isInputValid: yearIsValid,
        inputChangeHandler: yearChangeHandler,
        setValue: setYearValue,
        reset: resetYear
    }                   = useInput(services.numberValidator)

    const {
        enteredValue: movieImgSrcValue,
        isTouched: isMovieSrcTouched,
        isInputValid: imgSrcIsValid,
        inputChangeHandler: imgSrcChangeHandler,
        setValue: setImgSrcValue,
        reset: resetImgSrc
    }                   = useInput(services.srcValidator)
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState({value: '', isTouched: false})
    const [infoMessage, setInfoMessage] = useState('')
    const [isFormSending,setIsFormSending] = useState(false)
    const params = useParams()

    const formIsValid = nameIsValid && yearIsValid && imgSrcIsValid
    useEffect(() => {
        if (props.action === 'edit') {
            let id = params.id
            dataFromServer.getById('http://localhost:8000/api/movies', id).then(data => {
                let movieObj = data.data
                setNameValue(movieObj.name);
                setYearValue(movieObj.premiered);
                setGenres(movieObj.genres)
                setImgSrcValue(movieObj.img)
            })
        }
    },[params.id,props.action])
    const submitHandler = (e) => {
        setInfoMessage('')
        e.preventDefault();
        if (formIsValid) {
            setIsFormSending(true)
            let movieToSend = {
                name: movieNameValue,
                premiered: movieYearValue,
                genres: genres,
                img: movieImgSrcValue
            }            
            let movieId = params.id

            if (props.action === 'edit') {                
            dataFromServer.updateItem('http://localhost:8000/api/movies', movieId, movieToSend).then(data => {
                        setInfoMessage(data.data)
                        setIsFormSending(false)
                    }).catch(err => setInfoMessage(err))

            } else if (props.action === 'add') {
                dataFromServer.addItem('http://localhost:8000/api/movies', movieToSend).then(data => {
                        setInfoMessage(data.data)
                        resetName();
                        resetYear()
                        resetImgSrc()
                        setIsFormSending(false)
                    }).catch(err => setInfoMessage(err))
            }             
        } else {
            setInfoMessage('The data is not valid')
        }
   }
   const formClasses = isFormSending ? '_sending' : ''
   const isFormTouched = isMovieNameTouched || isMovieYearTouched || isMovieSrcTouched || genre.isTouched
    return (
                <form className = {formClasses} onSubmit = {submitHandler}>
                    <p>{infoMessage}</p>
                    <Input type = 'text' id = "movieName" label = "Name" value = {movieNameValue} onChange = {nameChangeHandler}/>
                    <Input type = 'text' id = "movieYear" label = "Premiered Year" value = {movieYearValue} onChange = {yearChangeHandler}/>
                    <div className = 'genres'>
                        <h4>Genres:</h4>
                        <ul>
                            {genres.map((genre, index) => <li key = {index}>{genre}</li> )}
                        </ul>
                        <select id = "movieGenre" onChange = {(e) => setGenre({value: e.target.value, isTouched: true})} value = {genre.value}> 
                        {services.existingGenres.map((item, index) => <option key = {index}>{item}</option>)}                    
                        </select>
                        <button type = 'button' onClick = {() => setGenres([...genres, genre.value])}>+</button>
                    </div>
       
                    <Input type = 'text' id = "movieImgSrc" label = "Image src" value = {movieImgSrcValue} onChange = {imgSrcChangeHandler}/>
                    <button type = 'submit' className = 'btn' disabled = {!isFormTouched}>Save Changes</button>
                </form>
    )
}

export default MovieForm