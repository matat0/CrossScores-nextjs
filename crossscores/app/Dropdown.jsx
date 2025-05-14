"use client";
import './Dropdown/Dropdown.css'
import Searchbar from './Searchbar.jsx';

function Dropdown({ closeDropdown, setSelectedTeam }) {

    return(
        <div className='search-module-container'>
            <div className='module-container'>
                <Searchbar 
                closeDropdown={closeDropdown}
                setSelectedTeam={setSelectedTeam}
                />
            </div>
        </div>
    );

}

export default Dropdown