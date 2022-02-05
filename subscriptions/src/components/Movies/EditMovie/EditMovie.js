import Card from "../../UI/Card/Card";
import { Link } from "react-router-dom";
import MovieForm from "../MovieForm/MovieForm";


function EditMovie(props) {

    return (
        <div className = 'form-container'>
             <Link to = '/movies' className = 'link-back'><i className="fas fa-arrow-left"></i>Back</Link>
            <Card>
                <h3>Edit Movie</h3>
                <MovieForm action = 'edit'/>
            </Card>
        </div>
    )
}

export default EditMovie