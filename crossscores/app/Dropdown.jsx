"use client";
import './Dropdown/Dropdown.css'
import Searchbar from './Searchbar.jsx';

function Dropdown() {

    return(
        <div className='search-module-container'>
            <div className='module-container'>
                <Searchbar />
            </div>
        </div>
    );

}

export default Dropdown