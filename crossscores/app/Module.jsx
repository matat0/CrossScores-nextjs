"use client";
import './Module/module.css'
import Dropdown from './Dropdown';
import {useState} from 'react'
import Searchbar from './Searchbar';



function Module() {
    const [showSearch, setShowSearch] = useState(false);

    return(
        <>
            {showSearch ? (<Dropdown/>) : ""}
            <div className="module">
                
                <button className="Btn" onClick={() => setShowSearch(!showSearch)}>
                    <div className="sign">+</div>
                    <div className="text">Create</div>
                </button>
                
            </div>
        </>
    );

}

export default Module