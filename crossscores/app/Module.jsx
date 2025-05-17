"use client";
import './Module/Module.css'
import Dropdown from './Dropdown';
import {useState, useContext, createContext} from 'react'
import Searchbar from './Searchbar';

const ModuleWindowContext = createContext();

function Module() {
    const [showSearch, setShowSearch] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState("");

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

    const contextValue = {
        closeDropdown,
        setSelectedTeam
    }
    return(
        <>

            {showSearch ? (
                <>
                    <div className="dropdown-container" onClick={backgroundClick}>
                        <ModuleWindowContext.Provider value={contextValue}>
                            <Dropdown />  
                        </ModuleWindowContext.Provider>
                    </div>
                </>
            ) : ""}

            <div className="module">
                
                <button className="Btn" onClick={openDropdown}>
                    <div className="sign">+</div>
                    <div className="text">Add</div>
                </button>
                
            </div>
            
        </>
    );

}

export default Module
export {ModuleWindowContext}