"use client";
import './Hamburger/Hamburger.css';
import Link from 'next/link';
import Dropdown from './Dropdown';
import {useState, useContext, createContext} from 'react'
import Searchbar from './Searchbar';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import DashboardIcon from '@mui/icons-material/Dashboard';


function Hamburger() {
    return(
        <div className="hamburger-menu-container">
            <div className="manu-options-container">
                <h2 id="menu-label">Menu</h2>

                <div className="menu-options" id="home-option">
                    <div><HomeIcon></HomeIcon></div>
                    <Link href="/home">
                        <button id="home-button">
                            <span>Home</span>
                        </button>
                    </Link>
                </div>

                <div className="menu-options" id="about-option">
                    <div><DashboardIcon></DashboardIcon></div>
                    <Link href="/">
                        <button id="home-button">
                            <span>Dashboard</span>
                        </button>
                    </Link>
                </div>

                <div className="menu-options" id="about-option">
                    <div><InfoIcon></InfoIcon></div>
                    <Link href="/about">
                        <button id="home-button">
                            <span>About</span>
                        </button>
                    </Link>
                </div>

            </div>
        </div>
    );

}

export default Hamburger