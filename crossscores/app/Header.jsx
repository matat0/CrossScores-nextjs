"use client";

import IconButton from '@mui/material/IconButton';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import Hamburger from './Hamburger.jsx';
import {useState} from 'react';


function Header() {
    const [hovered, setHovered] = useState(false);
    const [toggleMenu, setToggleMenu] = useState(false);

    return(
        <header>
            
            <div className="header">
                <div className ="burger-container">
                    <IconButton 
                        onMouseEnter={()=> {setHovered(true)}} 
                        onMouseLeave={()=>{setHovered(false)}}
                        sx={{ color: 'white' }}
                        onClick={()=> {setToggleMenu(!toggleMenu)}}
                    >
                        {hovered ? (<MenuOpenRoundedIcon></MenuOpenRoundedIcon>) : (<MenuRoundedIcon></MenuRoundedIcon>) }
                    </IconButton> 
                    {toggleMenu && (
                        <div className="hamburger-menu-container"><Hamburger/></div>
                        )}
                </div>
            
                <div className="header-label">
                    <p id="header-text">CrossScores</p>    
                </div>
            </div>
        </header>
    );
}

export default Header