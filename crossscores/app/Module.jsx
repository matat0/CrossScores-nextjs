"use client";
import './Module/module.css'
import Dropdown from './Dropdown';
import {useState} from 'react'
import Searchbar from './Searchbar';



function Module() {
    const [showSearch, setShowSearch] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(false);

    function openDropdown() {
        setShowSearch(true);
    }

    function closeDropdown() {
        setShowSearch(false);
    }

    function backgroundClick(e) {
        if (e.target.classList.contains('dropdown-container')) {
            closeDropdown();
        }
    }

    return(
        <>

            {showSearch ? (
                <>
                    <div className="dropdown-container" onClick={backgroundClick}>
                        <Dropdown 
                        closeDropdown={closeDropdown}
                        setSelectedTeam={setSelectedTeam}
                        />  
                    </div>
                </>
            ) : ""}

            <div className="module">
                {!selectedTeam ? (
                    <button className="Btn" onClick={openDropdown}>
                        <div className="sign">+</div>
                        <div className="text">Create</div>
                    </button>
                ) : (
                    <div className="selected-team">
                        {selectedTeam}
                    </div>
                )}
            </div>
            
        </>
    );

}

export default Module