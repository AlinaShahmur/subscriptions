import Input from '../../UI/Input/Input'
import './SearchPanel.css'

function SearchPanel(props) {
    return (
        <div className = 'search-panel'>          
            <Input type = 'text'
                    id = 'searchInput'
                    value = {props.inputValue}
                    onChange = {props.changeHandler}
                    placeholder = {props.placeholder}/>
            <button type = 'button' onClick = {props.onSearch} className = 'btn'>Find</button>
           {props.isSearched && <button onClick = {props.reset} className = "reset-search-btn">
                <i className="fas fa-ban"></i>
            </button>}  
        </div>
    )
}

export default SearchPanel