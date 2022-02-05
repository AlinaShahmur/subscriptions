import Card from "../../UI/Card/Card";
import './CreateMovie.css'
import MovieForm from "../MovieForm/MovieForm";
import { Link } from "react-router-dom";

function CreateMovie() {

    return (
        <div className = "form-container">
            <Card>
                <Link to = '/movies' className = 'link-back'><i className="fas fa-arrow-left"></i>Back</Link>
                <h3>Create Movie</h3>
                <MovieForm action = 'add'/>
            </Card>
        </div>
    )
}

export default CreateMovie