import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { moviesActions } from "../../../store/movies";
import dataFromServer from "../../../utils/dataFromServer";
import Movie from "../Movie/Movie";
import SearchPanel from "../SearchPanel/SearchPanel";
import './AllMovies.css'

function AllMovies(props) {
    const [filteredMovies, setFilteredMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [searchInputValue, setSearchInputValue] = useState('')
    const [isFiltered, setIsFiltered] = useState(false)
    const dispatch = useDispatch();
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movie');
        dataFromServer.getItems('http://localhost:8000/api/movies').then(response => {
            setFilteredMovies(response.data)
            setMovies(response.data)
            dispatch(moviesActions.init(response.data))
            if (movieId) {
                setFilteredMovies(response.data.filter(movie => movie._id === movieId))
            }
        })
    },[])

    const changeSearchHandler = (e) => {
        setSearchInputValue(e.target.value)
    }
    const searchHandler = () => {
        if (searchInputValue !== '') {
            setIsFiltered(true)
            setFilteredMovies(movies.filter(movie => movie.name.toLowerCase().includes(searchInputValue.toLowerCase())))
        } else {
            alert('enter search criteria')
        }
    }
    const resetSearch = () => {
        setFilteredMovies(movies)
        setIsFiltered(false)
        setSearchInputValue('')
    }
    const moviesContent = filteredMovies.length > 0 ? 
                filteredMovies.map(item => (
                    <Movie key = {item._id} 
                        title = {item.name} 
                        img = {item.img} 
                        genres = {item.genres}
                        id = {item._id}
                        year = {item.premiered}/>)
                    ) : <p>Not found</p> 
    return (
        <div className = 'all-items'>
            <SearchPanel 
                changeHandler = {changeSearchHandler}
                onSearch = {searchHandler}
                inputValue = {searchInputValue}
                isSearched = {isFiltered}
                reset = {resetSearch}    
                placeholder = 'search movie by name'           
            />                                                                                       
            <h2>All Movies</h2>
           {moviesContent} 
        </div>
    )
}

export default AllMovies