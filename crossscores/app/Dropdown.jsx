"use client";
import './Dropdown/Dropdown.css'
import Searchbar from './Searchbar.jsx';

function Dropdown({ closeDropdown }) {

    return(
        <div className='search-module-container'>
            <div className='module-container'>
                <Searchbar closeDropdown={closeDropdown}/>
            </div>
        </div>
    );

}

export default Dropdown